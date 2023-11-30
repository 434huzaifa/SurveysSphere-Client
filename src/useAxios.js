import axios from 'axios'
const caxios =axios.create({
	// baseURL:'http://localhost:5353',
	baseURL:'https://b8a12-server-side-434huzaifa.vercel.app',
	withCredentials:true,
})
const useAxios = () => {
	return caxios
};
	
export default useAxios;