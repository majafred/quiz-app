import { shallow } from 'enzyme';
import Button from '../Button';
import Summary from '.';

let wrapper;
const props = {
    unanswered: 1,
    correct: 7,
    wrong: 2,
}

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('<Summary />', () => {
    beforeEach(() => {
        wrapper = shallow(<Summary {...props} />);
    });

    it('renders correctly', () => {
        expect(wrapper.find('.summary-page--title')).toHaveLength(1);
        expect(wrapper.find('.summary-page--correct-answers')).toHaveLength(1);
        expect(wrapper.find('.summary-page--incorrect-answers')).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it('simulates go back action', () => {
        wrapper.find(Button).simulate('click');
        expect(wrapper.find(Summary)).toHaveLength(0);
    });
});