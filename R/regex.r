#extract band name
test2 <- str_extract(bands[4,1], "(?<=>)(.*?)(?=<)")

#extract id
#not working when band name has numbers :(
test <- str_extract(bands[4,1], "\\d+")

#not working yet
better_id <- str_extract(bands[4,1], "(?<=(.{45})(.*?)(?=<)")

#clean status