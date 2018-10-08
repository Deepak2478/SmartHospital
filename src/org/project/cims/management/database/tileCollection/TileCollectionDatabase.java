package org.project.cims.management.database.tileCollection;

import java.util.List;
import org.hibernate.Query;
import org.hibernate.Session;
import org.project.cims.management.model.TileCollection;
import org.project.cims.management.database.tileCollection.dto.TileCollectionDTO;
import org.project.cims.management.model.Dashboard;

public class TileCollectionDatabase {
	/*
	public Dashboard getStack(Session session) {
		TileCollection tile;
		List<TileCollection> tileColl = new ArrayList<>();
		Dashboard dash=new Dashboard();
		TileCollectionDTO dto = new TileCollectionDTO();
		
		Query q = session.createQuery("Select id_title from TileCollectionDTO");
		@SuppressWarnings("unchecked")
		List<String> tileName = q.list();
		
		session.beginTransaction();
		for(String s : tileName){
			tile = new TileCollection();
			dto = session.get(TileCollectionDTO.class, s);
			
			tile.setIcon(dto.getIcon());
			tile.setId_title(dto.getId_title());
			tile.setInfo(dto.getInfo());
			tile.setInfoState(dto.getInfoState());
			tile.setNumber(dto.getNumber());
			tile.setTitle(dto.getTitle());
			
			tileColl.add(tile);
		}
		session.getTransaction().commit();
		
		dash.setTileCollection(tileColl);
		return dash;
	}*/
	public Dashboard getStack(Session session) {
		TileCollection tile;
		Dashboard dash=new Dashboard();
		
		Query q = session.createQuery("from TileCollectionDTO");
		@SuppressWarnings("unchecked")
		List<TileCollectionDTO> tileName = q.list();
		for(TileCollectionDTO tN: tileName) {
			tile = new TileCollection();
			tile.setIcon(tN.getIcon());
			tile.setId_title(tN.getId_title());
			tile.setInfo(tN.getInfo());
			tile.setInfoState(tN.getInfoState());
			tile.setNumber(tN.getNumber());
			tile.setTitle(tN.getTitle());
			dash.getTileCollection().add(tile);
		}
		return dash;
		
	}

}
