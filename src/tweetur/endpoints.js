// endpoints information 

const USERTIMELINE = {
	url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
	params: {
		user_id: {
			required: false,
			type: "string"
		}, 	
		screen_name: {
			required: false,
			type: "string"
		}, 
		since_id: {
			required: false,
			type: "string"
		}, 
		count: {
			required: false,
			type: "number"
		}, 
		max_id: {
			required: false,
			type: "string"
		},
		trim_user: {
			required: false,
			type: "boolean,number"
		},
		exclude_replies: {
			required: false,
			type: "boolean"
		},
		include_rts: {
			required: false,
			type: "boolean"
		}
	}
}

const FOLLOWERSLIST = {
	url: "https://api.twitter.com/1.1/followers/list.json",
	params: {
		user_id: {
			required: false,
			type: "string"
		}, 	
		screen_name: {
			required: false,
			type: "string"
		}, 
		cursor: {
			required: false,
			type: "string"
		}, 
		count: {
			required: false,
			type: "number"
		}, 
		skip_status: {
			required: false,
			type: "boolean,number"
		},
		include_user_entities: {
			required: false,
			type: "boolean"
		},
	}
}

const FRIENDSLIST = {
	url: "https://api.twitter.com/1.1/friends/list.json",
	params: {
		user_id: {
			required: false,
			type: "string"
		}, 	
		screen_name: {
			required: false,
			type: "string"
		}, 
		cursor: {
			required: false,
			type: "string"
		}, 
		count: {
			required: false,
			type: "number"
		}, 
		skip_status: {
			required: false,
			type: "boolean,number"
		},
		include_user_entities: {
			required: false,
			type: "boolean"
		},
	}
}

const FOLLOWERSIDS = {
	url: "https://api.twitter.com/1.1/followers/ids.json",
	params: {
		user_id: {
			required: false,
			type: "string"
		}, 	
		screen_name: {
			required: false,
			type: "string"
		}, 
		cursor: {
			required: false,
			type: "string"
		}, 
		count: {
			required: false,
			type: "number"
		}, 
		stringify_ids: {
			required: false,
			type: "boolean"
		}
	}
}

const FRIENDSIDS = {
	url: "https://api.twitter.com/1.1/friends/ids.json",
	params: {
		user_id: {
			required: false,
			type: "string"
		}, 	
		screen_name: {
			required: false,
			type: "string"
		}, 
		cursor: {
			required: false,
			type: "string"
		}, 
		count: {
			required: false,
			type: "number"
		}, 
		stringify_ids: {
			required: false,
			type: "boolean"
		}
	}
}

const USERSLOOKUP = {
	url: "https://api.twitter.com/1.1/users/lookup.json",
	params: {
		screen_name: {
			required: false,
			type: "object,string",
			array: true
		},
		user_id: {
			required: true,
			type: "object,string",
			array: true
		},
		include_entities: {
			required: false,
			type: "boolean"
		},
		tweet_mode: {
			required: false,
			type: "boolean"
		}
	}
}

const USERSSHOW = {
	url: "https://api.twitter.com/1.1/users/show.json",
	params: {
		screen_name: {
			required: true,
			type: "string",
		},
		user_id: {
			required: false,
			type: "string"
		},
		include_entities: {
			required: false,
			type: "boolean"
		}
	}
}

const CHECKLIMIT = {
	url: "https://api.twitter.com/1.1/application/rate_limit_status.json",
	params: {
		resources: {
			required: true,
			type: "object",
			array: true
		}
	}
}

// default module
module.exports = {
	USERTIMELINE,
	FOLLOWERSLIST,
	FRIENDSLIST,
	FOLLOWERSIDS,
	FRIENDSIDS,
	USERSLOOKUP,
	USERSSHOW,
	CHECKLIMIT
}
// named exports
exports.USERTIMELINE = USERTIMELINE
exports.FOLLOWERSLIST = FOLLOWERSLIST
exports.FRIENDSLIST = FRIENDSLIST
exports.FOLLOWERSIDS = FOLLOWERSIDS
exports.FRIENDSIDS = FRIENDSIDS
exports.USERSLOOKUP = USERSLOOKUP
exports.USERSSHOW = USERSSHOW
exports.CHECKLIMIT = CHECKLIMIT

