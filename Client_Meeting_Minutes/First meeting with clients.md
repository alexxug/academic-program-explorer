

# Introductions 

## Sharon Mythen 

     - works at UWA, in teh planning team and support schools of engineering, and phsyics and computing 

     - works a lot with study plans 

     - the issue: its a very manual process 

     - there is a database managment system called Kadie (?) 

     - all info goes into db 

     - can be exported to a spreadsheet (unit code, name, unit coordinator, availability of unit s1/s2, learning outcomes, unit rules) 

     - unit rules 

       - study this unit before you can enrol in that unit 

     - hope is that we can develop an interactive visualisation of hte study plan 

       - click and drag units (what happens if this goes into S2? does that work? no, its a s1 unit) 

     - be use to students to plan course of study 

     - academic staff to ensure the plan is reviewed 

     - might discontinue units / add new units 

     - cutting and pasting a work document 

     - scope for human error is large 

     - at the end of the day, its a drag and drop study planner 

     - start with 1 course and get it working 

## Michael Stewart 

     - Post doctorate research at UWA 

     - Its about databases, and designing interfaces 

     - Coming on as a mentor / guidance. Direct us towards db design and technologies we can use. 

  

  

# Questions 

    - what is the database management system? Kadie? 

    - any examples? No, we will design it together 

    - no need for access differences / its kind of like a playground 

    - would there be a way to adjust availability of a unit? 

    - meeting frequency: 

      - Every week is fine for the next couple of weeks, then... 

      - meeting every 2 weeks to show stories 

      - Wednesday mornings 

    - language to use: 

      - use react for front end 

      - the back end... flask / express / whatever 

    - data being provided - Excel spreadsheet 

      - Unit code, title, role, availabilities (online, f2f)(simplify, data 

        cleanup), outcomes, [prerequisites, advisable prior study, corequisites 

        (unit must be studied at the same time, or beforehand), 

        incompatibilities (least worried about this, remove this column for now)] 

    - study plan 

      - purple is pre-requisites / conversion -> may do all or 1 of them (why only 1?) 

      - white is core units (8 of them in MiT) 

      - OPTIONS are identified in a table, taken from a prescribed body of 

        knowledge, not all units. 

    - will this be a website? 

      - this will be a link to a webpage 

    - key constraints 

      - unit availablility: s1? s2? both? 

      - prerequisites: can the unit acutally take the unit? warning triangle, cannot take here because missing prerequisite 

      - type of unit: core / option / conversion 

      - within unit code: level 4/5. generally you want to do 4 before 5, its not always possible 

      - is the student commencing in semester 1 or semester 2? 

  

# Actions 

    - Sharon to send excel spreadsheet 

    - PDF study plans 

      - 4 of them 

      - sem 1 commencing 

      - sem 2 commencign 

      - 2 year with conversion 

      - 1 1/2 year without conversion 

    - meeting next week 10am 
