import { mount } from '@vue/test-utils';
import App from '../src/vue/App.vue';
import axios from 'axios';


jest.mock('axios');
axios.get
    .mockImplementationOnce(() => Promise.resolve({
        data: {
            'ats-list': [
                {
                    name: 'Железная',
                    list: [
                        'Avaya IP Office',
                        'Cisco UCM',
                        'LG iPecs',
                        'Panasonic KX-TDA/TDE, КX-NS',
                        'Samsung OfficeServ',
                    ],
                }],
        },
    }))
    .mockImplementationOnce(() => Promise.resolve({
        data: {
            '1C program': 'Управление нашей фирмой',
            'suitable program': 'Интеграция с телефонией',
            'supported features': [
                'Получение информации о звонках',
                'Создать исходящий звонок',
                'Положить трубку',
                'Постановка на удержание',
                'Перевод безусловный',
                'Перевод безусловный',
                'Перевод условный',
                'Динамическая маршрутизация командой перевода',
            ],
            'unsupported features': [
                'Получение информации о звонках',
                'Создать исходящий звонок',
                'Положить трубку',
            ],
            'links to instructions': [
                {
                    href: 'http://google.com',
                    name: 'Инструкция к АТС Mango',
                },
                {
                    href: 'http://google.com',
                    name: 'Инструкция к АТС Яндекс',
                },
                {
                    href: 'http://google.com',
                    name: 'Инструкция к АТС iToolabs',
                },
            ],
        },
    }));


describe('Компонент App', () => {
    const wrapper = mount(App);

    test('есть хотя бы 1 атс', (done) => {
        wrapper.vm.$nextTick(() => {
            const ats = wrapper.find('.ats-list__item');
            expect(ats.element instanceof Node).toBe(true);
            done();
        });
    });

    test('кнопка активна, только если выбрана атс', (done) => {
        const clearAtsButton = wrapper.find('.ats-list__clear');
        const button = wrapper.find('.button-step1');
        const ats = wrapper.find('.ats-list__item');
        clearAtsButton.trigger('click');
        expect(button.attributes().disabled).not.toBeUndefined();
        ats.trigger('click');

        wrapper.vm.$nextTick(() => {
            expect(button.attributes().disabled).toBeUndefined();
            done();
        });
    });

    test('после перехода на 2 шаг отображаются данные', async (done) => {
        const clearAtsButton = wrapper.find('.ats-list__clear');
        const button = wrapper.find('.button-step1');
        const ats = wrapper.find('.ats-list__item');
        clearAtsButton.trigger('click');
        ats.trigger('click');

        await wrapper.vm.$nextTick();
        button.trigger('click');

        await wrapper.vm.$nextTick();
        const button2 = wrapper.find('.button-step2');
        expect(button2.element instanceof Node).toBe(true);

        done();
    });
});
