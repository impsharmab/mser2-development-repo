package com.imperialm.imimserservices.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Builder
@Entity
@Table(name = "Properties")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@IdClass(DBPropertiesPK.class)
public class DBProperties implements Serializable{
    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "programId")
    private Program program = new Program();
    @Id
    private String name;
    private String value;
    public DBProperties(){}

    public DBProperties(Program program, String name, String value) {
        this.program = program;
        this.name = name;
        this.value = value;
    }
}
