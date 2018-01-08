/**
 *
 */
package com.imperialm.imimserservices.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.entities.EmailProperties;

/**
 * @author Dheerajr
 *
 */
@Repository
@Transactional
public interface EmailPropetiesRepo extends JpaRepository<EmailProperties, Integer> {
	public EmailProperties findByEmailName(String emailName);

	public EmailProperties findByEmailNameAndProgramProgramId(String emailName, int programId);
}
