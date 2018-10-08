package org.project.cims.management.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.project.cims.management.database.tileCollection.dto.TileCollectionDTO;
import org.project.cims.management.service.DepartmentService;

@Path("/department")
public class DepartmentManager extends SessionFactoryCreator{

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String getDepartmentNumber() {
		return new DepartmentService().getDeptNum(session);
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String addDepartment(TileCollectionDTO tile) {
		return new DepartmentService().addDept(tile, session);
	}
}
