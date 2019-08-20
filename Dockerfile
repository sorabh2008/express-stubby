# Create a docker image              
FROM node                            
LABEL org.label-schema.version=v1.1  
RUN mkdir -p /var/node               
ADD ./ /var/node/                    
WORKDIR /var/node/                   
RUN npm i                            
EXPOSE 9000                          
CMD cd /var/node && npm run dev