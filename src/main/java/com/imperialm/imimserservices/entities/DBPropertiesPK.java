package com.imperialm.imimserservices.entities;

import lombok.Data;

import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data

public class DBPropertiesPK implements Serializable{
    @Id
    private String name;
    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "programId")
    private Program program = new Program();

    public DBPropertiesPK(){
    }

    /**
     *
     * @param name
     * @param program
     */
    public DBPropertiesPK(String name, Program program) {
        this.name = name;
        this.program = program;
    }
}
