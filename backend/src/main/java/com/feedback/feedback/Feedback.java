package com.feedback.feedback;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "feedback")
@Getter
@Setter
@NoArgsConstructor
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String type; // bug, feature, improvement, question

    @NotBlank
    private String title;

    @NotBlank
    @Column(length = 4000)
    private String description;

    private Integer rating; // 1..5

    private String priority; // low, medium, high, urgent

    private String status = "pending"; // pending, in-progress, resolved, closed

    private Instant date = Instant.now();
}


