package app.service;

import app.entities.Account;
import app.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Optional<Account> findAccountByEmail(String email) {
        return this.accountRepository.findAccountByEmail(email);
    }

    public Account createOrUpdate(Account account) {
        return this.accountRepository.save(account);
    }

}
