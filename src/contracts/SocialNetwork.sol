pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint public postCount = 0;
    mapping(uint => post) public posts;

    struct post {
        uint id;
        string content;
        uint tipAmount;
        address author;
    }

    event postCreated(
        uint id,
        string content,
        uint tipAmount,
        address author
    );

    constructor() public {
        name = "Dapp University Social Network Demo";
    }

    function createPost(string memory content) public {
        require(bytes(content).length > 0);
        postCount++;
        posts[postCount] = post(postCount, content, 0, msg.sender);
        emit postCreated(postCount, content, 0, msg.sender);
    }
}