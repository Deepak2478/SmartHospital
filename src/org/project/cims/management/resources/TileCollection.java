package org.project.cims.management.resources;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.project.cims.management.database.tileCollection.TileCollectionDatabase;
import org.project.cims.management.model.Dashboard;

@Path("/tiles")
@Produces(MediaType.APPLICATION_JSON)
public class TileCollection extends SessionFactoryCreator{

	TileCollectionDatabase dash = new TileCollectionDatabase();
	
	
	@GET
	@Path("/")
	public Dashboard getAllStacks(){
		return dash.getStack(session);
	}
}
