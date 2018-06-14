#Looping through to get info from the band's page

library(rvest)
library(xml2)
library(stringr)


ptm <- proc.time()
for (i in 1:nrow(bands_clean))
	{
	
		#go to page
		pg <- read_html(bands_clean[i,7])
	
		#Location
		bands_clean[i, 8] <- str_extract((html_nodes(pg, "dl.float_left > dd:nth-child(4)")), "(?<=>)(.*?)(?=<)")
		#Formed In
		bands_clean[i, 9] <- str_extract((html_nodes(pg, "dl.float_left > dd:nth-child(8)")), "(?<=>)(.*?)(?=<)")
		#Lyrical Themes
		bands_clean[i, 10] <- str_extract((html_nodes(pg, "dl.float_right > dd:nth-child(4)")), "(?<=>)(.*?)(?=<)")
		#Last Label - needs to be cleaned.  Had to make less specific in order to capture Unsigned bands
		bands_clean[i, 11] <- str_extract((html_nodes(pg, "dl.float_right > dd:nth-child(6)")), "(?<=>)(.*?)(?=<)")
		#Years Active - Collapsed to one line.  Still need to clean
		bands_clean[i, 12] <- xml_text(html_nodes(pg, "dl.clear > dd:nth-child(2)"))
	}

	
	
proc.time()-ptm