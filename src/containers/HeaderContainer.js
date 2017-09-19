import {connect} from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = (state) => ({
	user: state.user
});


const ReduxContainer = connect(mapStateToProps)(Header);

export default ReduxContainer;
