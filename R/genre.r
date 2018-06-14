for (i in 1:nrow(bands)){
	bands[i,16] <- (if (is.na(str_extract(bands[i, 3], ' '))){
		bands[i,3]
	}
	else {'NA'})
	}

	
for (i in 1:nrow(bands)){
    bands[i,17] <- (if ((str_count(bands[i,16], '/'))==1){
		strsplit(bands[i,16], '/')[[1]][2]
	
	} 
	else {'NA'}
    )
}

for (i in 1:nrow(bands)){
	bands[i,16] <- (if (bands[i, 16]=='NA'){
		str_extract(bands[i,3], '\\w+(?= Metal)')
	
	}
	else {'NA'}
)

}




for (i in 1:nrow(bands)){
	bands[i,16] <- (if (is.na(str_extract(bands[i, 3], ' '))){
		bands[i,3]
	}
	else {
		str_extract(bands[i,3], '\\w+(?= Metal)')
	}

	)
	}
	
	

#modifier
for (i in 1:nrow(bands)){
	bands[i,18] <- (if (is.na(str_extract(bands[i,3], paste0('.{1}(?=', bands[i,16], ')')))) {'NA'}
	else if (str_extract(bands[i,3], paste0('.{1}(?=', bands[i,16], ')'))==' ') {
		str_extract(bands[i,3], paste0('\\w+(?= ', bands[i,16], ')'))
	}
	else {'NA'}
		
	
	)


}


#subgenre
for (i in 1:nrow(bands)){
	bands[i,19] <- (if (bands[i,17]=='NA' && !(is.na(str_extract(bands[i, 3], ' '))) && (str_extract(bands[i,3], paste0('.{1}(?=', bands[i,16], ')')))=='/' && str_locate(bands[i,3], bands[i,16])!=1){
		str_extract(bands[i,3], paste0('\\w+(?=/', bands[i,16], ')'))
	}
					else if (bands[i,17]=='NA' && !(is.na(str_extract(bands[i, 3], ' '))) && str_extract(bands[i,3], paste0('(?<=', bands[i,16], ' ).{6}'))=='Metal/'){
		str_extract(bands[i,3], '(?<=Metal/)\\w+')
	}
	else if (bands[i,17]!='NA'){bands[i,17]}
	else {'NA'}
	)
}

