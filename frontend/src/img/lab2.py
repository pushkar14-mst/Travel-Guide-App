def CandiesLog(s):
    kids=0
    total=0
    i=0
    for i in s:
        if i.islower():
            kids =kids+1
            candies=0
            # while i<len(s) and s[i].isdigit():
            #     total=candies*10 +int(s[i])
            #     i+=1


    return "K" + str(kids) 



res=CandiesLog("a1a5b2c3")
print(res)
