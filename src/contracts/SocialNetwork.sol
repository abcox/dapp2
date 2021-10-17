pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;

    struct Post {
        uint id;
        string content;
        uint tipAmount;
        address payable author;
    }

    event PostCreated(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    event PostTipped(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    constructor() public {
        name = "Dapp University Social Network Demo";
    }

    function createPost(string memory content) public {
        // required valid content
        require(bytes(content).length > 0, 'content required');
        // increment post count/id
        postCount++;
        // create post
        posts[postCount] = Post(postCount, content, 0, msg.sender);
        // emit event
        emit PostCreated(postCount, content, 0, msg.sender);
    }

    function tipPost(uint id) public payable {
        // require valid id
        require(id >= 1 && id <= postCount, `invalid id ${id}`);
        // fetch post
        Post memory post = posts[id];
        // get author
        address payable author = post.author;
        // pay author
        address(author).transfer(msg.value);
        // increment tip amount
        post.tipAmount = post.tipAmount + msg.value;
        // update post
        posts[id] = post;
        // emit event
        emit PostTipped(postCount, post.content, post.tipAmount, author);
    }
}