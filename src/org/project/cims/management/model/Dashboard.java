package org.project.cims.management.model;

import java.util.ArrayList;
import java.util.List;

public class Dashboard {

	private List<TileCollection> TileCollection = new ArrayList<TileCollection>();

	public List<TileCollection> getTileCollection() {
		return TileCollection;
	}

	public void setTileCollection(List<TileCollection> tileCollection) {
		TileCollection = tileCollection;
	}

	
	
}
