import { shallow } from 'enzyme';
import ListItem from '.';

let wrapper;
const onChange = jest.fn();
const props = {
    onChange: onChange,
    id: "A-1", 
    value: "Green",
    disabled: false,
    checked: null,
}

describe('<ListItem />', () => {
    beforeEach(() => {
        wrapper = shallow(<ListItem {...props} />);
    });

    it('renders correctly', () => {
        expect(wrapper.find('.list-item')).toHaveLength(1);
        expect(wrapper.find('input')).toHaveLength(1);
        expect(wrapper.find('label')).toHaveLength(1);
    });

    it('simulates onChange event', () => {
        const event = {
            preventDefault() { },
            target: { value: 'value' }
        };

        wrapper.find('input').simulate('change', event);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(props.id);
    });
});