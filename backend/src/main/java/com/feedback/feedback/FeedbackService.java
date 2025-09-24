package com.feedback.feedback;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public Feedback create(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Page<Feedback> search(String q, String status, String type, int page, int size, String sortBy) {
        Sort sort;
        switch (sortBy) {
            case "rating" -> sort = Sort.by(Sort.Direction.DESC, "rating");
            case "title" -> sort = Sort.by(Sort.Direction.ASC, "title");
            default -> sort = Sort.by(Sort.Direction.DESC, "date");
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedbackRepository.search(emptyToNull(q), emptyToNull(status), emptyToNull(type), pageable);
    }

    public Optional<Feedback> updateStatus(Long id, String status) {
        return feedbackRepository.findById(id).map(f -> {
            f.setStatus(status);
            return feedbackRepository.save(f);
        });
    }

    public void delete(Long id) {
        feedbackRepository.deleteById(id);
    }

    private String emptyToNull(String v) {
        return (v == null || v.isBlank() || v.equalsIgnoreCase("all")) ? null : v;
    }
}


