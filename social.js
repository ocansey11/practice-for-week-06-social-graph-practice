// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    this.currentID+=1

    let user = {
      id : this.currentID,
      name: name
    }

    let follows = new Set()

    this.users[this.currentID] = user
    this.follows[this.currentID] = follows

    return this.currentID
  }

  getUser(userID) {
    // Your code here
    if(this.users[userID]){
      return this.users[userID]
    }
    else
    return null
  }

  follow(userID1, userID2) {
    // Your code here
    // first we need to be able to get User1 and User2
    if(this.getUser(userID1) && this.getUser(userID2)){
        this.follows[userID1].add(userID2)
        return true
    }
    return false

  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID]
  }

  getFollowers(userID) {
    // Your code here
    // 1. Identify the type of Graph
        // - its undirected. However it is not an adjacency graph
        // - we are doing a search and not traversal
        // - we need to move from the first user(1) to the current User(currentID). If the user has our User's Id in its follows set (example 1 : Set[2, USERID, 4, 100]) that user is a follower.

    // 2. Implement the getNeighbors function.
        //  - it gets tricky here, because most Users might never be neighbors.
        // our neighbor is simply the currentNode + 1. Since the ID increase by 1 till we get to the final id which is stored as this.currentID

    //3. Traverse the graph.

    let id =  1
    let queue = [id]
    let followers = new Set()
    let end = this.currentID + 1

    while(queue[0] !== end){
      let currentNode = queue.shift()
      let following = this.follows[currentNode]

      if(following.has(userID)){
        followers.add(currentNode)
      }

      id++
      queue.push(id)
    }
    return followers
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here

    let queue = [[userID]]
    let visited =  new Set()
    let recommend = []

    while(queue.length > 0){
      let currentPath = queue.shift()
      let currentNode = currentPath[currentPath.length -1]

      if(!visited.has(currentNode)){
        visited.add(currentNode)

        if(currentPath.length > 2 && currentPath.length <= degrees + 2 ){
          recommend.push(currentNode)
        }


        let neighbor = Array.from(this.follows[currentNode])

        for(let i = 0; i < neighbor.length; i++){
          let pathCopy = [...currentPath];
          pathCopy.push(neighbor[i]);
          queue.push(pathCopy);

        }
      }
    }
    return recommend
  }

}

module.exports = SocialNetwork;
