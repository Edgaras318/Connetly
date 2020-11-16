package app.service;

import app.entities.Category;
import app.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getCategories() { return this.categoryRepository.findAll(); }

    public Optional<Category> getCategory(UUID id) { return this.categoryRepository.findById(id); }

    public void deleteCategory(UUID id) { this.categoryRepository.deleteById(id);}

    public Category postCategory(Category category) { return this.categoryRepository.save(category);}
}
