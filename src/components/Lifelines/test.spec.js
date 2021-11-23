import { shallow } from 'enzyme';
import Button from '../Button';
import Lifelines from '.';
import { data } from '../../data/questions.json';

let wrapper;
const setTimeLeft = jest.fn();
const setAnswers = jest.fn();
const props = {
    timeLeft: 15,
    answers: data.questions[0].answers,
    questions: data.questions,
    step: 0,
    setTimeLeft: setTimeLeft,
    setAnswers: setAnswers,
}

describe('<Lifelines />', () => {
    beforeEach(() => {
        wrapper = shallow(<Lifelines {...props} />);
    });

    it('renders correctly', () => {
        expect(wrapper.find('.quiz-page--lifeline--title')).toHaveLength(1);
        expect(wrapper.find('.quiz-page--lifeline--desc')).toHaveLength(1);
        expect(wrapper.find('.quiz-page--lifeline--buttons-section')).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(2);
    });

    it('simulates onClick 50/50 lifeline and makes sure it only fires once', () => {
        const updatedAnswers = [{
            id: 'A-1',
            answerText: 'Avokado'
        },
        {
            id: 'A-2',
            answerText: 'Flour'
        }];
        wrapper.find(Button).at(0).simulate('click');
        expect(setAnswers).toHaveBeenCalledTimes(1);
        expect(setAnswers).toHaveBeenCalledWith(updatedAnswers);

        wrapper.find(Button).at(0).simulate('click');
        expect(setAnswers).toHaveBeenCalledTimes(1);
    });

    it('simulates onClick +10s lifeline and makes sure it only fires once', () => {
        wrapper.find(Button).at(1).simulate('click');
        expect(setTimeLeft).toHaveBeenCalledTimes(1);
        expect(setTimeLeft).toHaveBeenCalledWith(props.timeLeft + 10);

        wrapper.find(Button).at(1).simulate('click');
        expect(setTimeLeft).toHaveBeenCalledTimes(1);
    });
});