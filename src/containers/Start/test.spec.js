import { mount } from 'enzyme';
import Start from '.';
import Button from '../../components/Button';

let wrapper;
const setShow = jest.fn();
const props = {
    setShow: setShow,
}

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('<Start />', () => {
    beforeEach(() => {
        wrapper = mount(<Start {...props} />);
    });

    it('renders correctly', () => {
        expect(wrapper.find('.start-page')).toHaveLength(1);
        expect(wrapper.find('.start-page--title')).toHaveLength(1);
        expect(wrapper.find('.start-page--desc')).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(1);
    });
});