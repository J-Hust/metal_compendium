#Reviews

#start timer
ptm <-proc.time()
	
library(RCurl)
library(rjson)
library(plyr)

#set URL variables
url1 <- "http://www.metal-archives.com/review/ajax-list-browse/by/alpha/selection/"
url2 <- "/json/1?sEcho=1&iColumns=7&sColumns=&iDisplayStart="
url3 <- "&iDisplayLength=200&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&iSortCol_0=2&sSortDir_0=asc&iSortingCols=1&bSortable_0=true&bSortable_1=false&bSortable_2=true&bSortable_3=false&bSortable_4=true&bSortable_5=true&bSortable_6=true&_=1463178246797"


j<-1
i<-1
		#First pass - establish df
		y <- fromJSON(getURL(paste0(url1, i, url2, j, url3)))

		y <- lapply(y, function(aaData)
		{
		data.frame(matrix(unlist(aaData), ncol=7, byrow=TRUE))
		})

		y <- do.call(rbind, y)
		assign("reviews", y)

#loop through all letters
for (i in letters)
	{
		j<-1
		#First pass - establish df for letter
		y <- fromJSON(getURL(paste0(url1, i, url2, j, url3)))

		y <- lapply(y, function(aaData)
		{
		data.frame(matrix(unlist(aaData), ncol=7, byrow=TRUE))
		})

		y <- do.call(rbind, y)
		
		#get count of records and rename df
		maxrecord <- y[1,1]
		#assign("bands", y)
		
		j<-j+199
		maxrecord <- as.numeric(maxrecord)
		maxrecord<- round_any(maxrecord, 200, f=floor)
		reviews <-rbind(reviews, y)
		#loop over all records for particular letter
		while (j<=maxrecord)
			{
			y <- fromJSON(getURL(paste0(url1, i, url2, j, url3)))

			y <- lapply(y, function(aaData)
			{
			data.frame(matrix(unlist(aaData), ncol=7, byrow=TRUE))
			})

			y <- do.call(rbind, y)
			reviews <- rbind(reviews, y)
			j<-j+200
			}
	}

#bands that start with a number
	
nbr1 <- "http://www.metal-archives.com/review/ajax-list-browse/by/alpha/selection/nbr/json/1?sEcho=1&iColumns=7&sColumns=&iDisplayStart="
nbr2 <- "&iDisplayLength=200&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&iSortCol_0=2&sSortDir_0=asc&iSortingCols=1&bSortable_0=true&bSortable_1=false&bSortable_2=true&bSortable_3=false&bSortable_4=true&bSortable_5=true&bSortable_6=true&_=1463181912959"
	
j<-1
		#First pass - establish df for letter
		y <- fromJSON(getURL(paste0(nbr1, j, nbr2)))

		y <- lapply(y, function(aaData)
		{
		data.frame(matrix(unlist(aaData), ncol=7, byrow=TRUE))
		})

		y <- do.call(rbind, y)
		
		#get count of records and rename df
		maxrecord <- y[1,1]
		#assign("bands", y)
		
		j<-j+199
		maxrecord <- as.numeric(maxrecord)
		maxrecord<- round_any(maxrecord, 200, f=floor)
		reviews <-rbind(reviews, y)
		#loop over all records for particular letter
		while (j<=maxrecord)
			{
			y <- fromJSON(getURL(paste0(nbr1, j, nbr2)))

			y <- lapply(y, function(aaData)
			{
			data.frame(matrix(unlist(aaData), ncol=7, byrow=TRUE))
			})

			y <- do.call(rbind, y)
			reviews <- rbind(reviews, y)
			j<-j+200
			}	
#stop the timer
proc.time()-ptm
			