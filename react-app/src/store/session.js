// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USER_BY_ID = 'session/GET_USER_BY_ID';
const UPDATE_USER = 'session/UPDATE_USER'

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const getUser = (data) => {
	return {
		type: GET_USER_BY_ID,
		payload : data
	}
}

const updateUser = (data) => {
	return {
		type: UPDATE_USER,
		payload : data
	}
}

const initialState = { user: null, userPage: {} };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const getUserByIdThunk = (id) => async dispatch => {
	const res = await fetch(`/api/users/${id}`)

	if (res.ok){

		const data = await res.json()
		dispatch(getUser(data))
		return data
	}
}

export const updateUserThunk = (userInfo, id) => async dispatch => {

	const res = await fetch(`/api/users/${id}/edit`, {
		method: "PUT",
		body:userInfo
	})
	if (res.ok){
		const data = await res.json()
		dispatch(updateUser(data))
	} else {
		console.log('it is not being accepted');
	}
}

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const deleteUserThunk = (user) => async (dispatch) => {
	const response = await fetch(`/api/users/${user.id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user.id)
	})

	if (response.ok){
		console.log("DELETED USER MAYBE")
	} else {
		console.log("DEFINITELY DID NOT DELETE USER")
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case GET_USER_BY_ID: {
			const newState = {...state, user:{...state.user, playlists: action.payload.playlists, likes: action.payload.likes}, userPage: action.payload}

			return newState
		}
		case UPDATE_USER: {
			const newState = {...state, user:{...state.user}, userPage:{...state.userPage}}
			console.log(action,'the acitonciont~~~~~');
			console.log(newState,'before update =====');
			newState.user = action.payload
			newState.userPage = action.payload
			console.log(newState,'after update =====');
			return newState
		}
		default:
			return state;
	}
}
