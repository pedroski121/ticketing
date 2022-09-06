# ticketing
This project is still in development. 
To run
1. Install and run Docker on your system
2. Install Kubernetes and make sure it is running
3. Make sure you have a nginx namespace in your kubernetes cluster
4. Install chocoletey on your system 
5. Using chocoletey install skaffold 
6. Go to C:\windows\system32\drivers\etc\hosts
       Add 127.0.0.1 ticketing.dev
7. In the root directory of the ticketing project 
  using your terminal run skaffold dev --trigger polling
8. The frontend of this project is not yet done so you will have to use an api testing tool such as postman to test



