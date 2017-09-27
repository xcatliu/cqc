module.exports = function two() {
    const foo = 1;
    const bar = 100;

    let i;
    for (i = foo; i < bar; i++) {
        console.log(i);
    }
    for (i = foo; i < bar; i++) {
        console.log(i);
    }
    for (i = foo; i < bar; i++) {
        console.log(i);
    }

    if (bar < i) {
        return bar;
    }

    return baz();

    function baz() {
        const foo = 1;
        const bar = 100;

        let i;
        for (i = foo; i < bar; i++) {
            console.log(i);
        }

        return i;
    }
};
