package com.imperialm.imimserservices.rest;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.HandlerMapping;

import com.imperialm.imimserservices.dao.VideoLinksDAO;
@Controller
public class FileController {

	@Value("${images.shared.folder.banner}")
	private String imagePath;
	
	@Value("${images.shared.folder}")
	private String imagesSharedFolder;
	
	@Value("${cms.shared.folder}")
	private String cmsPath;
	
	@Value("${images.shared.folder.assets}")
	private String assetPath;
	
	@Autowired
	private VideoLinksDAO VideoLinksDAO;
	
	@RequestMapping(value="/services/files/imageUpload", method = RequestMethod.POST)
	public ResponseEntity<?> UploadFile(MultipartHttpServletRequest request) throws IOException {

		Iterator<String> itr=request.getFileNames();
		MultipartFile file=request.getFile(itr.next());
		String fileName=file.getOriginalFilename();
		File dir = new File(imagePath);

		if (dir.isDirectory())
		{
			File serverFile = new File(dir,fileName);
			if(!serverFile.exists()){
				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(file.getBytes());
				stream.close();
				return ResponseEntity.ok("Uploaded");
			}
		}

		return ResponseEntity.badRequest().body(HttpStatus.CONFLICT);
	}


	@GetMapping("/services/files/listFiles")
	public ResponseEntity<?> listUploadedFiles() throws IOException {

		File dir = new File(imagePath);

		if (dir.isDirectory())
		{
			List<String> files = new ArrayList<String>();
			File[] a = dir.listFiles();
			for(File b: a){
				files.add(b.getName());
			}

			return ResponseEntity.ok(files);
		}

		return ResponseEntity.badRequest().body(HttpStatus.CONFLICT);
	}

	@RequestMapping(value = "/services/files/get/{file_name:.+}", method = RequestMethod.GET)
	@ResponseBody
	public FileSystemResource getFile(@PathVariable("file_name") String fileName) {
		return new FileSystemResource(imagePath + fileName);
	}
	
	@RequestMapping(value = "/services/loadrsc/{file_name:.+}", method = RequestMethod.GET)
	@ResponseBody
	public FileSystemResource getImage(@PathVariable("file_name") String fileName) {
		return new FileSystemResource(imagesSharedFolder + fileName);
	}
	
	@RequestMapping(value = "/content/file/{file_name:.+}", method = RequestMethod.GET)
	@ResponseBody
	public FileSystemResource getCmsFiles(@PathVariable("file_name") String fileName) {
		return new FileSystemResource(cmsPath + fileName);
	}
	
	@RequestMapping(value = "/shared/imi-cms/MSER/**", method = RequestMethod.GET)
	@ResponseBody
	public FileSystemResource getCmsfile(final HttpServletRequest request) {
		String path = (String) request.getAttribute(
	            HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
	        String bestMatchPattern = (String ) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);

	        AntPathMatcher apm = new AntPathMatcher();
	        String finalPath = apm.extractPathWithinPattern(bestMatchPattern, path);
		finalPath = finalPath.replace("/", "\\");
		return new FileSystemResource(cmsPath + finalPath);
	}
	
	@RequestMapping(value = "/file/assets/**", method = RequestMethod.GET)
	@ResponseBody
	public FileSystemResource getAssetfile(final HttpServletRequest request) {
		String path = (String) request.getAttribute(
	            HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
	        String bestMatchPattern = (String ) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);

	        AntPathMatcher apm = new AntPathMatcher();
	        String finalPath = apm.extractPathWithinPattern(bestMatchPattern, path);
		finalPath = finalPath.replace("/", "\\");
		return new FileSystemResource(assetPath + finalPath);
	}
	
	
	@GetMapping("/services/files/Video/{program}")
	@ResponseBody
	public Object getVideoList(@PathVariable("program") String program) {
			return VideoLinksDAO.getVideosByProgram(program);
	}
	
	@GetMapping("/services/files/Video/")
	@ResponseBody
	public Object getVideoList() {
		return VideoLinksDAO.getAllVideos(); 
	}
	
	
	@RequestMapping(value = "/services/files/VideoTimeStamps/", method = RequestMethod.GET)
	@ResponseBody
	public boolean setVideoTimeStamps(final HttpServletRequest request) throws MalformedURLException {
		
		return true;
	}
	
	@RequestMapping(value = "/services/files/report/", method = RequestMethod.GET)
	@ResponseBody
	public Object getReport(final HttpServletRequest request) throws MalformedURLException {
		
	return null;
	}

}