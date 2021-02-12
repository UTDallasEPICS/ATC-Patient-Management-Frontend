import PropTypes from 'prop-types';

const studentListItem = ({ firstName, lastName, id, img }) => {
    return (
        <div>
            <p>Student: {firstName} {lastName}</p>
        </div>
    )
}

studentListItem.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

export default studentListItem
