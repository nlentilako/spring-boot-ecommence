package com.company.smartecommerce.common.utils;

import com.company.smartecommerce.common.constants.PaginationConstants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PaginationUtil {
    
    public static Pageable createPageable(Integer page, Integer size, String sortBy, String sortDir) {
        // Set defaults if null
        int pageNumber = page != null ? Math.max(0, page) : PaginationConstants.DEFAULT_PAGE_NUMBER;
        int pageSize = size != null ? Math.min(size, PaginationConstants.MAX_PAGE_SIZE) : PaginationConstants.DEFAULT_PAGE_SIZE;
        String sortField = sortBy != null ? sortBy : PaginationConstants.DEFAULT_SORT_BY;
        String direction = sortDir != null ? sortDir.toUpperCase() : PaginationConstants.DEFAULT_SORT_DIRECTION;
        
        Sort sort = direction.equals("DESC") ? 
            Sort.by(sortField).descending() : 
            Sort.by(sortField).ascending();
            
        return PageRequest.of(pageNumber, pageSize, sort);
    }
    
    public static Pageable createDefaultPageable() {
        return PageRequest.of(
            PaginationConstants.DEFAULT_PAGE_NUMBER,
            PaginationConstants.DEFAULT_PAGE_SIZE,
            Sort.by(PaginationConstants.DEFAULT_SORT_BY).descending()
        );
    }
}