library("rvest")
library("stringr")
library("plyr")



for(i in i:nrow(idonly))
	{
	bnd <- read_html(paste0("http://www.metal-archives.com/band/discography/id/", idonly$idd[i], "/tab/all"))
	disco1 <- bnd %>% html_nodes(".display") %>% html_table(fill=TRUE)
	disco2 <- (data.frame(matrix(unlist(disco1), ncol=4, byrow=FALSE), stringsAsFactors=FALSE))
	
	#set band id	
	disco2$bandid <- idonly$idd[i]
	
	#once we have the album, loop through the table to get the url
	try(for (j in 1:nrow(disco2))
		{
		disco2[j, 6] <- as.character(bnd %>% html_nodes(paste0(".display > tbody:nth-child(2) > tr:nth-child(", j, ") > td:nth-child(1) > a:nth-child(1)")))
		})

	#bind to master df
	albums <- rbind.fill(albums, disco2)
	} 

