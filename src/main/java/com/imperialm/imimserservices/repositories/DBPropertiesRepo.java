package com.imperialm.imimserservices.repositories;

import com.imperialm.imimserservices.entities.DBProperties;
import com.imperialm.imimserservices.entities.DBPropertiesPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface DBPropertiesRepo extends JpaRepository<DBProperties, DBPropertiesPK>{
    public DBProperties findByNameAndProgramProgramId(String name, int programId);
    public List<DBProperties> findByNameStartingWithAndProgramProgramId(String name, int programId);
    public List<DBProperties> findByNameInAndProgramProgramId(List<String> name, int programId);
}
