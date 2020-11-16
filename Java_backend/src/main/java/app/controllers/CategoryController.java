package app.controllers;

import app.dto.CategoryDTO;
import app.entities.Account;
import app.jwt.TokenProvider;
import app.logic.CategoryLogic;
import app.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private final CategoryLogic categoryLogic;
    private final CategoryService categoryService;

    public CategoryController(CategoryLogic categoryLogic, CategoryService categoryService) {
        this.categoryLogic = categoryLogic;
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity getCategories(){
        return ResponseEntity.ok(this.categoryService.getCategories());
    }

    @PostMapping
    public ResponseEntity postCategory(@AuthenticationPrincipal Account account, @RequestBody CategoryDTO categoryDTO){
        return this.categoryLogic.postCategory(account, categoryDTO);
    }
}
