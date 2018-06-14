#Bands
	
library(RCurl)
library(rjson)
library(plyr)

#set URL variables
url1 <- "http://www.metal-archives.com/browse/ajax-letter/l/"
url2 <- "/json/1?sEcho=2&iColumns=4&sColumns=&iDisplayStart="
url3 <- "&iDisplayLength=2000&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&bSortable_0=true&bSortable_1=true&bSortable_2=true&bSortable_3=false&_=1462052260436"


j<-1
i<-1
		#First pass - establish df
		x <- fromJSON(getURL(paste0(url1, i, url2, j, url3)))

		x <- lapply(x, function(aaData)
		{
		data.frame(matrix(unlist(aaData), ncol=4, byrow=TRUE))
		})

		x <- do.call(rbind, x)
		assign("bands", x)

#loop through all letters
for (i in letters)
	{
		j<-1
		x <- fromJSON(getURL(paste0(url1, i, url2, j, url3)))

		x <- lapply(x, function(aaData)
		{
		data.frame(matrix(unlist(aaData), ncol=4, byrow=TRUE))
		})

		x <- do.call(rbind, x)
		
		#get count of records for particular letter
		maxrecord <- x[1,1]
		
		j<-j+499
		maxrecord <- as.numeric(maxrecord)
		maxrecord<- round_any(maxrecord, 500, f=floor)
		bands <-rbind(bands, x)
		#loop over all records for particular letter
		while (j<=maxrecord)
			{
			x <- fromJSON(getURL(paste0(url1, i, url2, j, url3)))

			x <- lapply(x, function(aaData)
			{
			data.frame(matrix(unlist(aaData), ncol=4, byrow=TRUE))
			})

			x <- do.call(rbind, x)
			bands <- rbind(bands, x)
			j<-j+500
			}
	}
			
#whoops!  Forgot bands whose name begins with a number.  Could expand this to make it more resilient - currently not many bands starting with number

x <-fromJSON(getURL("http://www.metal-archives.com/browse/ajax-letter/l/NBR/json/1?sEcho=1&iColumns=4&sColumns=&iDisplayStart=0&iDisplayLength=500&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&bSortable_0=true&bSortable_1=true&bSortable_2=true&bSortable_3=false&_=1463181637758"))
x <- lapply(x, function)
		x <- lapply(x, function(aaData)
		{
		data.frame(matrix(unlist(aaData), ncol=4, byrow=TRUE))
		})

		x <- do.call(rbind, x)	
bands <-rbind(bands, x)		