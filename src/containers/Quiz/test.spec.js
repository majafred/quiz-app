import { mount } from 'enzyme';
import Quiz from '.';
import Button from '../../components/Button';
import Summary from '../../components/Summary';

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


describe('<Quiz />', () => {
    beforeEach(() => {
        wrapper = mount(<Quiz {...props} />);
    });

    it('renders correctly', () => {
        expect(wrapper.find('.quiz-page--top-bar')).toHaveLength(1);
        expect(wrapper.find('.quiz-page--section')).toHaveLength(1);
        expect(wrapper.find('.quiz-page--question')).toHaveLength(1);
        expect(wrapper.find('.quiz-page--question--text')).toHaveLength(1);
        expect(wrapper.find('.quiz-page--navigation')).toHaveLength(1);
        expect(wrapper.find('.quiz-page--timer')).toHaveLength(1);
        expect(wrapper.find('.quiz-page--navigation--buttons')).toHaveLength(1);
        expect(wrapper.find(Summary)).toHaveLength(0);
    });

    it('simulates on click skip button', () => {
        const skipBtn = wrapper.find(Button).at(2);
        let question = wrapper.find('.header').at(1).text();

        expect(question).toContain('Question 1');

        skipBtn.simulate('click');
        question = wrapper.find('.header').at(1).text();
        expect(question).toContain('Question 2');

        skipBtn.simulate('click');
        question = wrapper.find('.header').at(1).text();
        expect(question).toContain('Question 3');
    });

    it('simulates on click next button', () => {
        const event = {
            preventDefault() { },
            target: { value: 'value' }
        };
        const nextBtn = wrapper.find(Button).at(3);
        let question = wrapper.find('.header').at(1).text();

        expect(question).toContain('Question 1');

        wrapper.find('input').at(0).simulate('change', event);

        nextBtn.simulate('click');
        question = wrapper.find('.header').at(1).text();
        expect(question).toContain('Question 2');

        nextBtn.simulate('click');
        question = wrapper.find('.header').at(1).text();
        expect(question).toContain('Question 2');
    });

    it('renders <Summary/> if questions are finished', () => {
        const skipBtn = wrapper.find(Button).at(2);

        for (let i = 0; i < 10; i++) {
            skipBtn.simulate('click');
        }

        expect(wrapper.find('.quiz-page--section')).toHaveLength(0);
        expect(wrapper.find(Summary)).toHaveLength(1);
    });
});