package com.ShowTime.ShowTimeApp.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "videos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Video {
    @MongoId
    private String id;
    private String fileName;
    private String description;
    private String contentType;
    private String filePath;
}
