package org.project.cims.management.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.project.cims.management.database.icon.dto.IconDTO;
import org.project.cims.management.model.IconModel;
import org.project.cims.management.service.IconService;

@Path("/icon")
public class IconManager extends SessionFactoryCreator{

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String addIcon(IconDTO icon){
		return new IconService().addIcon(icon, session);
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public IconModel getIcons() {
		return new IconService().getIcons(session);
	}
}
