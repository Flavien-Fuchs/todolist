function onDropAnimation(element) {
    element.animate([
        {
            transform: "scale(1.1)",
            opacity: 1
        },
        {
            transform: "scale(1)",
            opacity: 0.5
        },
        {
            transform: "scale(1)",
            opacity: 1
        }
    ], {
        duration: 500,
        easing: 'ease-out',
        iterations: 1,
        direction: 'normal',
        fill: 'forwards'
    });
}

function onDeleteAnimation(articleElement) {
    const emojiElement = articleElement.querySelector('.task-emoji');
    const taskTitle = articleElement.querySelector('.task-title');
    const taskDate = articleElement.querySelector('span');
    const taskComment = articleElement.querySelector('div');

    const animation = [
        {
            opacity: 1,
            transform: 'scale(1)',

        },
        {
            opacity: 0,
            transform: 'scale(1.1)',

        },
        {
            opacity: 1,
            transform: 'scale(1)',

        },
    ];

    articleElement.animate(animation, {
        duration: 900,

        easing: 'ease-out',
        iterations: 1,
        direction: 'normal',
        fill: 'forwards'
    });

    emojiElement.animate([
        {
            transform: 'translateX(0) rotate(0)',
            opacity: 1,
        },
        {
            transform: `translateX(-${articleElement.offsetWidth}px) rotate(-360deg)`,
            opacity: 0,
        },
        {
            transform: 'translateX(0) rotate(0)',
            opacity: 1,
        }
    ], {
        duration: 700,
        easing: 'ease-out',
        iterations: 1,
        direction: 'normal',
        fill: 'forwards'
    });

    taskTitle.animate([

        {
            opacity: 1,
        },
        {
            opacity: 0,
        },
        {
            opacity: 1,
        }
    ], {
        duration: 700,
        easing: 'ease-out',
        iterations: 1,
        direction: 'normal',
        fill: 'forwards'
    });

    taskDate.animate([

        {
            opacity: 1,
        },
        {
            opacity: 0,
        },
        {
            opacity: 1,
        }
    ], {
        duration: 700,
        easing: 'ease-out',
        iterations: 1,
        direction: 'normal',
        fill: 'forwards'
    });

    taskComment.animate([

        {
            opacity: 1,
        },
        {
            opacity: 0,
        }
    ], {
        duration: 300,
        easing: 'ease-out',
        iterations: 1,
        direction: 'normal',
        fill: 'forwards'
    });
}

