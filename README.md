# Description
## The Problem
Waste disposal is a difficult problem in our cities and towns that have to balance a delicate relationship between necessity, environmental impacts, and costs. One of the major costs in the recycling programs provided by state and local governments is the cost of sorting non-recyclable waste from the recyclable rubbish. Current solutions include better automation techniques and strategies for educating the public on what is recyclable and what isn't. The final problem is the cost of illegally disposed waste, or litter, that cost local governments over $18 million in 2017. We need a way of helping people make correct decisions for recycling, more effective education strategies and a way to incentivize and encourage more responsible disposal of rubbish. 

## Our Solution
The team behind Recyclable have all experienced having a piece of rubbish and wondering if it was recyclable or not, having some rubbish but not sure where the appropriate bins are and wanting to know what sort of impact we're making by changing the way we produce and deal with rubbish. To address these problems, we have created Recyclable, an app powered by machine learning to provide decision support on how to responsibly dispose of your rubbish.
 

### Machine Learning
Our service is powered by Google Tensorflow for detecting images taken by the Recyclable app. If you're unsure which bin you should throw your rubbish into, our app can let you know by identifying what your rubbish is and then advising you whether it is recyclable. A user can quickly take out their phone, take a picture and get instant advice. As we understand that different councils can have different recycling strategies, our app uses your current location and matches it with the recycling data we have collected in our database. 
 

### Education
While our app is able to provide immediate decision support, by continually using the app, users will become more familiar and knowledgeable about what is and what isn't recyclable. In order to do so, we have provided tools so you can keep track of your progress in reducing your environmental impact. You can see how much rubbish you produced and how much of it was recyclable. We can even break down what type of rubbish you had so you can make more conscious decisions when buying things. Finally, we give you the opportunity to see how you're contributing to your city and state waste disposal. Think of it as a fitness app for your environment!


### Incentives
We believe that people want to do the right thing if there are no hurdles in the way and that littering is part of this. Often times people litter because they can't find a bin nearby (or close enough) and they do not see past the immediate effects of their actions. We've developed Recyclable as a communication medium between the public on one side and governments and corporations on the other side. With governments and companies working to reduce the use of non-recyclable and non-biodegradable rubbish, we can offer both parties opportunities to work together and create incentives. Imagine if a supermarket rewarded environmentally conscious customers with loyalty points. It could deepen customer loyalty and enable brands to send a strong message about their stance on environmental responsibility. 

With our machine learning network, we also have a unique opportunity for brands. When a user takes a photo of a canned drink, not only does our AI identify the can but the brand. Imagine being able to reach out and personally thank a user for purchasing their product but also reward them for responsibly disposing of the packaging. 

We have built an app with a unique approach to solving a difficult problem. We now encourage our corporate friends to work with our idea and help the environment while adding value to their brand!

# Data Story
## Our Strategy
Our data collection strategy revolved around collecting information 

### Local Government Recycling Programs
we have compiled a list of recycling programs from major cities and cities that have been in the spotlight for their recycling programs in the past year. This data is publicly available on the website for each local government.
* Melbourne
* Sydney
* Brisbane
* Canberra
* Adelaide
* Perth
* Darwin
* Hobart
* Gold Coast 
* Ipswich 
For local governments that are not listed here, we have generated a list of recyclable items that are common across those listed above.

### Queensland
Using the data sets and environmental reports provided by the Queensland Government to gain insight into the scale of the problem and identify interesting data sets that we wanted users to consume in a visual way.
* Tonnage of solid waste recovered
* Tonnage of trackable waste recovered
* Comparison between Queensland and national average for
** Material types littered
** Average trend over time
* Household waste landfilled
This data was critical to our design process and making decisions on how we could gamify rubbish disposal while also providing feedback on a user's environmental impact. 


### Gold Coast
As we're based on the Gold Coast, we were fortunate to have a mentor from the Gold Coast City Council who specialized in their data trove. Originally we wanted to get a collection of public bins but were unable to get access to the data. However, we were advised that we can use parks, barbeques, and other public facilities as general locations due to the council's policy for providing bins in those areas. 


### Machine Learning
Using the Tensorflow machine learning framework, we used the publicly available Inception model for object detection. Using this as a basis, we collected more images on the items listed as being recyclable by each city council which was used for more specialized training to improve the accuracy of our AI. 


### Generating Data
Our final goal was to generate data so that we could having some good, old-fashioned inter-city and inter-state rivalries. How does your city compare to your neighboring city? Do you recycle more? Who produces less waste per capita? By providing this data in a fun and interesting manner, we're able to give feedback on your contribution to the city, state and, most importantly, your environment. 
