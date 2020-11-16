package app.controllers;

import app.dto.LoginDTO;
import app.dto.RegisterDTO;
import app.entities.Account;
import app.jwt.TokenProvider;
import app.logic.PasswordAssistor;
import app.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AccountService accountService;
    private final PasswordAssistor passwordAssistor;

    @Autowired
    public AuthController(TokenProvider tokenProvider, AccountService accountService, PasswordAssistor passwordAssistor) {
        this.tokenProvider = tokenProvider;
        this.accountService = accountService;
        this.passwordAssistor = passwordAssistor;
    }

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginDTO loginModel) {
        Optional<Account> user = accountService.findAccountByEmail(loginModel.getEmail());

        if(!user.isPresent()) {
            return new ResponseEntity<>("Wrong Credentials", HttpStatus.BAD_REQUEST);
        }

        Account account = user.get();
        String password = account.getPassword();

        if(!this.passwordAssistor.isMatch(loginModel.getPassword(), password)) {
            return new ResponseEntity<>("Wrong Credentials", HttpStatus.BAD_REQUEST);
        }

        if(!user.get().isAccountNonLocked()) {
            return new ResponseEntity<>("Account disabled or locked", HttpStatus.BAD_REQUEST);
        }

        try {
            Map<Object, Object> model = new LinkedHashMap<>();
            model.put("token", tokenProvider.createToken(user.get().getId(), user.get().getFirstName(), user.get().getLastName(), user.get().getRole()));
            model.put("user", user.get());
            return ok(model);
        } catch(AuthenticationException ex) {
            return new ResponseEntity<>("Unexpected error", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody RegisterDTO registerModel) {


        if(accountService.findAccountByEmail(registerModel.getEmail()).isPresent()) {
            return new ResponseEntity<>("User already exists", HttpStatus.BAD_REQUEST);
        }

        try {
            Account user = new Account();
            user.setEmail(registerModel.getEmail());
            user.setFirstName(registerModel.getFirstName());
            user.setLastName(registerModel.getLastName());
            user.setPassword(passwordAssistor.hash(registerModel.getPassword()));
            user.setCity(registerModel.getCity());
            user.setHouseNumber(registerModel.getHouseNumber());
            user.setNationality(registerModel.getNationality());
            user.setPostalCode(registerModel.getPostalCode());

            Account createdUser = accountService.createOrUpdate(user);

            Map<Object, Object> model = new LinkedHashMap<>();
            model.put("token", tokenProvider.createToken(createdUser.getId(), createdUser.getFirstName(), createdUser.getLastName(), createdUser.getRole()));
            model.put("user", createdUser);
            return ok(model);
        } catch(Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }




}
