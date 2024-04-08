'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const runningLine = document.querySelectorAll('.running-line');
    const runningThumb = `<div class="running-thumb">
            <span>Дело помощи утопающим — дело рук самих утопающих!</span>
            <span>Шахматы двигают вперед не только культуру, но и экономику!</span>
            <span>Лед тронулся, господа присяжные заседатели!</span>
        </div>`;

    const runningWidth = document.querySelector('.running-thumb').clientWidth;
    let viewport = window.innerWidth;

    const insertRunningThumbs = () => {
        const amount = Math.ceil(viewport / runningWidth);

        for (let i = 1; i <= amount; i++) {
            runningLine.forEach(line => line.insertAdjacentHTML('beforeend', runningThumb));
        }
    }

    insertRunningThumbs();



    // создание этапов (сетка/слайдер)

    let rendered = '';

    const stages = [
        'Строительство железнодорожной магистрали Москва-Васюки',
        'Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов',
        'Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет',
        'Строительство дворца для турнира',
        'Размещение гаражей для гостевого автотранспорта',
        'Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов',
        'Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн'
    ]; // этапы

    const stagesContent = document.querySelector('.stages-content'); // место для вставки
    const renderStagesGrid = () => {
        if (rendered === 'slider' || rendered === '') {
            try {
                stagesContent.querySelector('.stages-slider-wrapper').remove();
            } catch (err) {}

            const gridStages = stages.map((stage, index) => `<article class="stage-card">
                <div class="stage-card__content">
                    <div class="stage-number">${index + 1}</div>
                    <span class="stage-span">${stage}</span>
                </div>
            </article>`);

            const grid = `<div class="stages-grid">
                            ${gridStages.join('')}
                            <div class="plane"></div>
            </div>`;

            stagesContent.insertAdjacentHTML('beforeend', grid);
            rendered = 'grid';
        }
    } // вставки сетки

    let stagesSlides = [];
    const renderStagesSlider = () => {
        if (rendered === 'grid' || rendered === '') {
            try {
                stagesContent.querySelector('.stages-grid').remove();
            } catch (err) {}

            for (let i = 1; i < stages.length; i++) {
                let slide = '';

                if (i === 1 || i === 3) {
                    slide = `<article class="stages-slide">
                        <div class="stages-wrapper">
                            <div class="slide-glass">
                                <div class="stage-top">
                                    <div class="stage-number">${i !== 3 ? i : i + 1}</div>
                                    <p>${i === 1 ? stages[i - 1] : stages[i]}</p>
                                </div>
                                <div class="stage-bottom">
                                    <div class="stage-number">${i !== 3 ? i + 1 : i + 2}</div>
                                    <p>${i === 1 ? stages[i] : stages[i + 1]}</p>
                                </div>
                            </div>
                        </div>
                    </article>`;
                } else {
                    slide = `<article class="stages-slide">
                         <div class="stages-wrapper">
                            <div class="slide-glass">
                                <div class="stage-top">
                                    <div class="stage-number">${i + 1}</div>
                                    <p>${stages[i]}</p>
                                </div>
                            </div>
                         </div>
                    </article>`;
                }

                if (stagesSlides.length !== stages.length) {
                    stagesSlides.push(slide);
                }
            }

            const radioBtns = stagesSlides.map((_, index) => `<input id="slide_${index}" name="stages_bullet" type="radio" value="${index}" ${index === 0 ? 'checked' : ''}><label for="slide_${index}"></label>`);

            const slider = `<div class="stages-slider-wrapper">
                <div class="stages-slider">
                    <div class="plane"></div>
                    <div class="slider-thumb">
                        ${stagesSlides.join('')}
                    </div>
                </div>
                <div class="slider-nav-btns">
                        <button class="slider-btn prev end" data-direction="prev" type="button" disabled></button>
                        <div class="slider-bullets">${radioBtns.join('')}</div>
                        <button class="slider-btn next" data-direction="next" type="button"></button>
                </div>
            </div>`;

            stagesContent.insertAdjacentHTML('beforeend', slider);

            rendered = 'slider';
        }
    } // вставка слайдера

    const stagesRenderer = () => {
        viewport = window.innerWidth;
        viewport > 375 ? renderStagesGrid() : renderStagesSlider(); // проверка вьюпорта
    }

    stagesRenderer();



    // слайдер с участниками
    const slides = {
        slide_1: {
            name: 'Остап Бендер',
            position: 'Чемпион мира по шахматам'
        },
        slide_2: {
            name: 'Хозе-Рауль Капабланка',
            position: 'Чемпион мира по шахматам'
        },
        slide_3: {
            name: 'Эммануил Ласкер',
            position: 'Чемпион мира по шахматам'
        },
        slide_4: {
            name: 'Александр Алехин',
            position: 'Чемпион мира по шахматам'
        },
        slide_5: {
            name: 'Арон Нимцович',
            position: 'Чемпион мира по шахматам'
        },
        slide_6: {
            name: 'Рихард Рети',
            position: 'Чемпион мира по шахматам'
        },
    }; // слайды

    let slideNumber = 4;
    let counter = 3;
    let indicator = 3;

    const participantsSlider = document.querySelector('.participants__slider'); // место для вставки
    const participantsCurrentSlideNumber = document.querySelector('.participants .current-slide'); // текущий номер слайда

    const viewportUpdateCounter = () => {
        viewport = window.innerWidth;

        if (viewport <= 375) {
            counter = 1;
            slideNumber = 2;
            indicator = 1;
        } else {
            counter = 3;
            slideNumber = 4;
            indicator = 3;
        }

        participantsCurrentSlideNumber.innerText = counter;
    }

    viewportUpdateCounter();

    const participantsSlidesArray = Object.values(slides).map(slide => `<article class="participants__slide">
          <figure>
               <img src="src/img/participant.png" alt="">
          </figure>
          <span class="participant-name">${slide.name}</span>
          <span class="participant-position">${slide.position}</span>
          <a class="more-info-link" href="#">Подробнее</a>
    </article>`);

    let currentView = '';

    const manySlides = () => {
        if (currentView === 'one' || currentView === '') {
            participantsSlider.innerHTML = '';
            const prerender = participantsSlidesArray.slice(0, 5);

            participantsSlider.insertAdjacentHTML('beforeend', prerender.join(''));
            currentView = 'many';
        }
    }

    const oneSlide = () => {
        if (currentView === 'many' || currentView === '') {
            participantsSlider.innerHTML = '';
            const prerender = participantsSlidesArray.slice(0, 3);

            participantsSlider.insertAdjacentHTML('beforeend', prerender.join(''));
            currentView = 'one';
        }
    }

    const participantsSlidesRenderer = () => {
        viewport = window.innerWidth;
        viewport > 375 ? manySlides() : oneSlide(); // проверка вьюпорта
    }

    participantsSlidesRenderer();

    const participantsSliderBtns = document.querySelectorAll('.participants .slider-btn');
    const participantsSliderDelay = () => setInterval(() => participantsSliderBtns[1].click(), 4000);

    let participantsDelay = participantsSliderDelay();

    participantsSliderBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            const direction = e.target.dataset.direction;

            clearInterval(participantsDelay);

            if (direction === 'next') {
                slideNumber++;

                if (counter < 6) {
                    counter++;
                } else {
                    counter = 1;
                }

                if (counter === indicator) {
                    slideNumber = 5;
                } else if (slideNumber > participantsSlidesArray.length - 1) {
                    slideNumber = 0;
                }

                const nextSlide = participantsSlidesArray[slideNumber];

                participantsCurrentSlideNumber.innerText = counter;

                e.target.disabled = true;

                participantsSlider.insertAdjacentHTML('beforeend', nextSlide);
                const firstSlide = participantsSlider.querySelector('.participants__slider .participants__slide:first-child');
                firstSlide.style.marginLeft = '-414px';

                setTimeout(() => {
                    firstSlide.remove();
                    e.target.disabled = false;
                    participantsDelay = participantsSliderDelay();
                }, 300);
            } else {
                slideNumber--;

                if (counter > 1) {
                    counter--;
                } else {
                    counter = 6;
                }

                if (counter === indicator) {
                    slideNumber = participantsSlidesArray.length - 1;
                } else if (slideNumber < 0) {
                    slideNumber = participantsSlidesArray.length - 1;
                }

                const prevSlide = participantsSlidesArray[slideNumber];

                participantsCurrentSlideNumber.innerText = counter;

                const firstSlide = participantsSlider.querySelector('.participants__slider .participants__slide:first-child');
                firstSlide.classList.add('animated');

                e.target.disabled = true;

                setTimeout(() => {
                    participantsSlider.insertAdjacentHTML('afterbegin', prevSlide);
                    firstSlide.classList.remove('animated');
                    const lastSlide = participantsSlider.querySelector('.participants__slider .participants__slide:last-child');
                    e.target.disabled = false;
                    lastSlide.remove();
                    participantsDelay = participantsSliderDelay();
                }, 300);
            }
        });
    });



    const setStageSlider = () => {
        // слайдер с этапами
        try {
            let nextStageSlide = 0;

            const sliderWrapper = document.querySelector('.stages-slider-wrapper');
            const stagesSliderContainer = sliderWrapper.querySelector('.stages-slider');
            const stagesSliderBtns = sliderWrapper.querySelectorAll('.slider-btn');
            const sliderThumb = stagesSliderContainer.querySelector('.stages-slider .slider-thumb');

            stagesSliderBtns.forEach(btn => {
                btn.addEventListener('click', e => {
                    const direction = e.target.dataset.direction;

                    if (direction === 'next') {
                        stagesSliderBtns[0].disabled = false;
                        stagesSliderBtns[0].classList.remove('end');
                        nextStageSlide++;

                        if (nextStageSlide === stagesSlides.length - 1) {
                            e.target.disabled = true;
                            e.target.classList.add('end');
                        }

                        const radio = sliderWrapper.querySelector(`input[type="radio"]#slide_${nextStageSlide}`);
                        radio.checked = true;

                        e.target.disabled = true;

                        sliderThumb.style.transform = `translateX(-${nextStageSlide * 375}px)`;

                        setTimeout(() => {
                            if (nextStageSlide < stagesSlides.length - 1) {
                                e.target.disabled = false;
                            }
                        }, 300);
                    } else if (direction === 'prev') {
                        stagesSliderBtns[1].disabled = false;
                        stagesSliderBtns[1].classList.remove('end');

                        nextStageSlide--;

                        if (nextStageSlide === 0) {
                            e.target.disabled = true;
                            e.target.classList.add('end');
                        }

                        e.target.disabled = true;

                        sliderThumb.style.transform = `translateX(-${nextStageSlide * 375}px)`;

                        const radio = sliderWrapper.querySelector(`input[type="radio"]#slide_${nextStageSlide}`);
                        radio.checked = true;

                        setTimeout(() => {
                            if (nextStageSlide > 0) {
                                e.target.disabled = false;
                            }
                        }, 290);
                    }
                });
            });
        } catch (err) {}
    }

    setStageSlider();

    window.addEventListener('resize', () => {
        stagesRenderer();
        viewportUpdateCounter();
        participantsSlidesRenderer();
        setStageSlider();
    });
});
