function requestData(url, config = {}) {
    config = {
        size: 10,
        onPause() {},
        onPlay() {},
        onFinish() {},
        onData() {},
        ...config,
    };

    let cur = 0;
    let status = 'pause';
    const size = config.size;

    function getData() {
        const range = `${cur}-${cur+size-1}`;
        axios.get(url, {
            headers: {
                Range: range
            }
        }).then(response => {
            const contentRange = response.headers['content-range'].split(' ')[1];
            let [range, total] = contentRange.split('/');
            let [st, en] = range.split('-');
            en = +en, total = +total;
            if (en >= total) {
                finish();
            } else {
                const onData = config.onData;
                typeof onData === 'function' ? onData(response) : null;

                cur = en + 1;
                if (status === 'play') {
                    getData();
                }
            }
        })
    }

    function play() {
        if (status === 'play') return;
        status = 'play';
        getData();

        const onPlay = config.onPlay;
        typeof onPlay === 'function' ? onPlay() : null;
    }

    function pause() {
        if (status === 'pause') return;
        status = 'pause';

        const onPause = config.onPause;
        typeof onPause === 'function' ? onPause() : null;
    }

    function finish() {
        if (status === 'finish') return;
        status = 'finish';

        const onFinish = config.onFinish;
        typeof onFinish === 'function' ? onFinish() : null;
    }

    function getStatus() {
        return status;
    }
    return {
        play,
        pause,
        finish,
        getStatus
    }
}