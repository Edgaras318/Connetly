package app.logic;

import app.dto.CategoryDTO;
import app.entities.Account;
import app.entities.Category;
import app.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;


import static org.springframework.http.ResponseEntity.ok;

@Component
public class CategoryLogic {

    private final CategoryService categoryService;

    public CategoryLogic(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    public ResponseEntity postCategory(Account account, CategoryDTO categoryDTO){
        Category category = new Category();
        category.setName(categoryDTO.getName());

        if(categoryDTO.getName() == ""){
            return new ResponseEntity("Category name is empty. Please provide a name", HttpStatus.BAD_REQUEST);
        }

        return ok(this.categoryService.postCategory(category));
    }


}
