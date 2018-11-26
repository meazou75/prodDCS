function msToTime(s) {
    // Pad to 2 digits
    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins);
}

// Fonction principale du bordel (très important)
function pdfGenPending(infos, customerInfo, engineerInfo) {
    var PAGE_HEIGHT = 792;

    var now = new Date();
    var date = now.getDate() + '/' + now.getMonth() + '/' + now.getFullYear();

    var PDFDocument, doc;
    var fs = require('fs');
    PDFDocument = require('pdfkit');
    doc = new PDFDocument();
    report_number = Math.floor(Math.random() * 255);
    // création du fichier
    doc.pipe(fs.createWriteStream('public/reports/' + infos._id + '.pdf'));

    doc.image('public/img/dcs.jpg', 50, 50, { width: 100 })

        // Date
        .fontSize(15)
        .opacity(0.2)
        .text(date, 460, 60)
        .opacity(1)

        .text(customerInfo.firstName + ' ' + customerInfo.lastName, 50, 99, {
            width: 270,
        })
        .fontSize(9)
        .text(customerInfo.company, 50, 115, {
            width: 270,
        })

    timein = new Date(infos.timeIn);
    timeout = new Date(infos.timeOut);
    // Time-in/out
    if (timein.getDate() != timeout.getDate()) {
        doc.fontSize(9)
            .text('TIME IN : ', 50, 140)
            .fontSize(12)
            .text(
                timein.getDate() +
                    '/' +
                    timein.getMonth() +
                    '/' +
                    timein.getFullYear() +
                    ' ' +
                    timein.getHours() +
                    ':' +
                    timein.getMinutes(),
                110,
                139
            )
            .fontSize(9)
            .text('TIME OUT : ', 250, 140)
            .fontSize(12)
            .text(
                timeout.getDate() +
                    '/' +
                    timeout.getMonth() +
                    '/' +
                    timeout.getFullYear() +
                    ' ' +
                    timeout.getHours() +
                    ':' +
                    timeout.getMinutes(),
                320,
                139
            )
            .fontSize(9)
            .text('LUNCH TIME : ', 50, 160)
            .fontSize(12)
            .text(
                infos.ignoreLunchTime != 0
                    ? msToTime(infos.ignoreLunchTime)
                    : 'no',
                130,
                159
            )
            .fontSize(9)
            .text('DINNER TIME : ', 250, 160)
            .fontSize(12)
            .text(
                infos.ignoreDinerTime != 0
                    ? msToTime(infos.ignoreDinerTime)
                    : 'no',
                320,
                159
            )
            .fontSize(9)
            .text('TOTAL TIME : ', 50, 180)
            .fontSize(14)
            .text(msToTime(infos.totalTime), 150, 178);
    } else {
        doc.fontSize(9)
            .text('TIME IN : ', 50, 140)
            .fontSize(12)
            .text(timein.getHours() + ':' + timein.getMinutes(), 130, 139)
            .fontSize(9)
            .text('TIME OUT : ', 250, 140)
            .fontSize(12)
            .text(timeout.getHours() + ':' + timeout.getMinutes(), 350, 139)
            .fontSize(9)
            .text('LUNCH TIME : ', 50, 160)
            .fontSize(12)
            .text(
                infos.ignoreLunchTime != 0
                    ? msToTime(infos.ignoreLunchTime)
                    : 'no',
                130,
                159
            )
            .fontSize(9)
            .text('DINNER TIME : ', 250, 160)
            .fontSize(12)
            .text(
                infos.ignoreDinerTime != 0
                    ? msToTime(infos.ignoreDinerTime)
                    : 'no',
                350,
                159
            )
            .fontSize(9)
            .text('TOTAL TIME : ', 50, 180)
            .fontSize(14)
            .text(msToTime(infos.totalTime), 150, 178);
    }

    doc.moveDown()
        .text("SERVICE DETAILS :", 50, 220);

    // Dynamic tasks
    infos.tasks.forEach(function(task) {
        if (doc.y >= PAGE_HEIGHT - 200) {
            doc.addPage().x = (50).y = 50;
        } else {
            doc.moveDown();
        }

        buff_y = doc.y;

        // Infos
        doc.fontSize(10)
            .text('TASK TYPE : ', 50, buff_y)
            .fontSize(14)
            .text(task.taskType.slice(0, 15), 150, buff_y - 3)
            .moveDown();
        buff_y = doc.y;
        doc.fontSize(10)
            .text('PRODUCT BRAND : ', 50, buff_y)
            .fontSize(14)
            .text(task.productBrand.slice(0, 15), 150, buff_y - 3)
            .fontSize(10)
            .text('PRODUCT MODEL : ', 240, buff_y)
            .fontSize(14)
            .text(task.productModel.slice(0, 15), 340, buff_y - 3)
            .text('QUANTITY : ', 400, buff_y)
            .fontSize(14)
            .text(task.quantity, 480, buff_y - 3)
            .fontSize(10);

        if (doc.y >= PAGE_HEIGHT - 100) {
            doc.addPage().x = (50).y = 50;
        } else {
            doc.moveDown();
        }

        buff_y = doc.y;

        // Tab
        doc.fontSize(10)
            .text(' *', 100, buff_y)
            .fontSize(10)
            .text('TASK', 260, buff_y)
            .fontSize(10)
            .text('STATUS', 470, buff_y)

            // vector graphics
            .moveTo(50, buff_y - 10)
            .lineTo(550, buff_y - 10)
            .stroke()
            .moveTo(50, buff_y + 15)
            .lineTo(550, buff_y + 15)
            .stroke();

        var index = 1;
        task.details.forEach(function(details) {
            if (doc.y >= PAGE_HEIGHT - 150) {
                doc.addPage().x = (50).y = 50;
            } else {
                doc.moveDown();
            }

            buff_y = doc.y + 10;

            doc.fontSize(16).text(index, 100, buff_y);
            index++;
            doc
                .fontSize(12)
                .text(details.taskStatus, 470, buff_y)
                .fontSize(10)
                .text(details.taskName, 200, buff_y, {
                    width: 250,
                    align: 'justify'
                })
                .moveDown().y += 10;
            doc.moveTo(60, doc.y)
                .lineTo(540, doc.y)
                .stroke();
        });
    });
    doc.moveDown();

    // Signature from both sides
    if (doc.y >= PAGE_HEIGHT - 120) {
        doc.addPage().x = (50).y = 50;
    }
    var buff_y = doc.y + 20;

    // temporaire, pour le dev
    var img64_signature =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAABkCAYAAACvgC0OAAAPx0lEQVR4Xu2dB8wVRReGDyo2sKEodkVBEFvsvWIXMdJEo7F3saHYo1E0KopGsVeQomIUUOy9t6jYK/ZeEHvlzzP/v9+/LHu/3bt3y71335OQL+Hu7Oy8s+/OmdOmzYwZM2aYRAgIgaZGoI2I3tTzq8EJAYeAiK4XQQiUAAERvQSTrCEKARFd74AQKAECInoJJllDFAIiut4BIVACBET0EkyyhigERHS9A0KgBAiI6CWYZA1RCIjoegeEQAkQENFLMMkaohAQ0fUOCIESICCil2CSNUQhIKLrHRACJUBARC/BJGuIQkBE1zsgBEqAgIhegknWEIWAiK53QAiUAAERvQSTrCEKARFd74AQKAECInoJJrnRhvjaa6/Zm2++aa+88oq9++671rdvX+vXr1+jDaOunldE903HmDFjbI899phlgnbYYQcbNGiQbbXVVjbHHHPU1QQ24sNMmzbNnn/+eXv22Wfd34kTJ0YO48MPP7Rll1028jpdEI6AiG5mkyZNsp133rmqd2SdddaxQw45xHbbbTebZ555qmrbzBe//vrr9vPPPxt/x40bZ1988YWxQvtl3nnntV9//TU2DKussoo999xzwjk2YrNeWHqi33vvvbbddtvVAOF/m84+++z28ssvGy9lM8v3339vrMj8ffrpp+3999+3t956y9555x2bOnVqrKGjFf3999+h13bq1Ml9dAcOHGiLLrqodevWzWabbbZY99VFlREoPdHbtGmT+vvB6sOKH0c++ugjW3LJJetuS/Dqq6+6D9eDDz7oVlP2zGHSrl07++WXX0J/W3HFFW2ppZZy4+vSpYv7oKL9dOjQwX788Ufr0aNHHIh0TQoIiOghRB8xYoRtueWW9scffzi188orr7Svv/7aPvnkk6pUzo8//tiWXnrpitN04YUX2uDBg22FFVawN954w9q2bZvClMa/BSr2Bx984PbJt99+u911112xGnft2tURF4ywW0DkRRZZJFZbXVQMAiJ6gOhRJ1T9+++/bpW75JJL3N4+SjbZZBM7/PDDneU4qIIuuOCCbmVDsjQ20cenn35qjzzyiHt2yI1FO0rYhmy44Ya200472UYbbeRWYkljIiCiB4j+22+/2dxzzx17Nv/55x877rjjbPjw4ZFt1lpr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';

    doc.moveDown()
        .fontSize(10)
        .text("DCS representative", 100, buff_y)
        .fontSize(10)
        .text("Customer", 450, buff_y)
        //    .image(engineerInfo.signature, 50, buff_y, {width: 100, height: 50})

        // temporaire, pour le dev
        .image(engineerInfo.signature, 50, buff_y + 10, { scale: 0.6 })

        .moveTo(50, buff_y + 60)
        .lineTo(200, buff_y + 60)
        .stroke()
        //    .image(customerInfo.signature, 50, buff_y, {width: 100, height: 50})

        // temporaire, pour le dev
        .image(customerInfo.signature, 400, buff_y + 10, { scale: 0.6 })

        .moveTo(400, buff_y + 60)
        .lineTo(550, buff_y + 60)
        .stroke()

        .fontSize(12)
        .text(engineerInfo.lastName + ' ' + engineerInfo.firstName, 50, buff_y + 70)
        .fontSize(9)
        .text(engineerInfo.position, 50, buff_y + 85)
        .fontSize(9)

        .fontSize(12)
        .text(customerInfo.lastName + ' ' + customerInfo.firstName, 280, buff_y + 70, {
            width: 270,
            align: 'right'
        })
        .fontSize(9)
        .text(customerInfo.position + ' of ' + customerInfo.company, 280, buff_y + 85, {
            width: 270,
            align: 'right'
        })

        .end();
}

function pdfGenAccepted(infos, customerInfo, engineerInfo) {
    var PAGE_HEIGHT = 792;

    var now = new Date();
    var date = now.getDate() + '/' + now.getMonth() + '/' + now.getFullYear();

    var PDFDocument, doc;
    var fs = require('fs');
    PDFDocument = require('pdfkit');
    doc = new PDFDocument();
    report_number = Math.floor(Math.random() * 255);
    // création du fichier
    doc.pipe(fs.createWriteStream('public/reports/' + infos._id + '.pdf'));

    doc.image('public/img/dcs.jpg', 50, 50, { width: 100 })

        // Date
        .fontSize(15)
        .opacity(0.2)
        .text(date, 460, 60)
        .opacity(1)

        .text(customerInfo.firstName + ' ' + customerInfo.lastName, 50, 99, {
            width: 270,
        })
        .fontSize(9)
        .text(customerInfo.company, 50, 115, {
            width: 270,
        })

    timein = new Date(infos.timeIn);
    timeout = new Date(infos.timeOut);
    // Time-in/out
    if (timein.getDate() != timeout.getDate()) {
        doc.fontSize(9)
            .text('TIME IN : ', 50, 140)
            .fontSize(12)
            .text(
                timein.getDate() +
                    '/' +
                    timein.getMonth() +
                    '/' +
                    timein.getFullYear() +
                    ' ' +
                    timein.getHours() +
                    ':' +
                    timein.getMinutes(),
                110,
                139
            )
            .fontSize(9)
            .text('TIME OUT : ', 250, 140)
            .fontSize(12)
            .text(
                timeout.getDate() +
                    '/' +
                    timeout.getMonth() +
                    '/' +
                    timeout.getFullYear() +
                    ' ' +
                    timeout.getHours() +
                    ':' +
                    timeout.getMinutes(),
                320,
                139
            )
            .fontSize(9)
            .text('LUNCH TIME : ', 50, 160)
            .fontSize(12)
            .text(
                infos.ignoreLunchTime != 0
                    ? msToTime(infos.ignoreLunchTime)
                    : 'no',
                130,
                159
            )
            .fontSize(9)
            .text('DINNER TIME : ', 250, 160)
            .fontSize(12)
            .text(
                infos.ignoreDinerTime != 0
                    ? msToTime(infos.ignoreDinerTime)
                    : 'no',
                320,
                159
            )
            .fontSize(9)
            .text('TOTAL TIME : ', 50, 180)
            .fontSize(14)
            .text(msToTime(infos.totalTime), 150, 178);
    } else {
        doc.fontSize(9)
            .text('TIME IN : ', 50, 140)
            .fontSize(12)
            .text(timein.getHours() + ':' + timein.getMinutes(), 130, 139)
            .fontSize(9)
            .text('TIME OUT : ', 250, 140)
            .fontSize(12)
            .text(timeout.getHours() + ':' + timeout.getMinutes(), 350, 139)
            .fontSize(9)
            .text('LUNCH TIME : ', 50, 160)
            .fontSize(12)
            .text(
                infos.ignoreLunchTime != 0
                    ? msToTime(infos.ignoreLunchTime)
                    : 'no',
                130,
                159
            )
            .fontSize(9)
            .text('DINNER TIME : ', 250, 160)
            .fontSize(12)
            .text(
                infos.ignoreDinerTime != 0
                    ? msToTime(infos.ignoreDinerTime)
                    : 'no',
                350,
                159
            )
            .fontSize(9)
            .text('TOTAL TIME : ', 50, 180)
            .fontSize(14)
            .text(msToTime(infos.totalTime), 150, 178);
    }

    doc.moveDown()
        .text("SERVICE DETAILS :", 50, 220);

    // Dynamic tasks
    infos.tasks.forEach(function(task) {
        if (doc.y >= PAGE_HEIGHT - 200) {
            doc.addPage().x = (50).y = 50;
        } else {
            doc.moveDown();
        }

        buff_y = doc.y;

        // Infos
        doc.fontSize(10)
            .text('TASK TYPE : ', 50, buff_y)
            .fontSize(14)
            .text(task.taskType.slice(0, 15), 150, buff_y - 3)
            .moveDown();
        buff_y = doc.y;
        doc.fontSize(10)
            .text('PRODUCT BRAND : ', 50, buff_y)
            .fontSize(14)
            .text(task.productBrand.slice(0, 15), 150, buff_y - 3)
            .fontSize(10)
            .text('PRODUCT MODEL : ', 240, buff_y)
            .fontSize(14)
            .text(task.productModel.slice(0, 15), 340, buff_y - 3)
            .text('QUANTITY : ', 400, buff_y)
            .fontSize(14)
            .text(task.quantity, 480, buff_y - 3)
            .fontSize(10);

        if (doc.y >= PAGE_HEIGHT - 100) {
            doc.addPage().x = (50).y = 50;
        } else {
            doc.moveDown();
        }

        buff_y = doc.y;

        // Tab
        doc.fontSize(10)
            .text(' *', 100, buff_y)
            .fontSize(10)
            .text('TASK', 260, buff_y)
            .fontSize(10)
            .text('STATUS', 470, buff_y)

            // vector graphics
            .moveTo(50, buff_y - 10)
            .lineTo(550, buff_y - 10)
            .stroke()
            .moveTo(50, buff_y + 15)
            .lineTo(550, buff_y + 15)
            .stroke();

        var index = 1;
        task.details.forEach(function(details) {
            if (doc.y >= PAGE_HEIGHT - 150) {
                doc.addPage().x = (50).y = 50;
            } else {
                doc.moveDown();
            }

            buff_y = doc.y + 10;

            doc.fontSize(16).text(index, 100, buff_y);
            index++;
            doc
                .fontSize(12)
                .text(details.taskStatus, 470, buff_y)
                .fontSize(10)
                .text(details.taskName, 200, buff_y, {
                    width: 250,
                    align: 'justify'
                })
                .moveDown().y += 10;
            doc.moveTo(60, doc.y)
                .lineTo(540, doc.y)
                .stroke();
        });
    });
    doc.moveDown();

    // Signature from both sides
    if (doc.y >= PAGE_HEIGHT - 100) {
        doc.addPage().x = (50).y = 50;
    }
    var buff_y = doc.y + 20;

    // temporaire, pour le dev
    var img64_signature =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAABkCAYAAACvgC0OAAAPx0lEQVR4Xu2dB8wVRReGDyo2sKEodkVBEFvsvWIXMdJEo7F3saHYo1E0KopGsVeQomIUUOy9t6jYK/ZeEHvlzzP/v9+/LHu/3bt3y71335OQL+Hu7Oy8s+/OmdOmzYwZM2aYRAgIgaZGoI2I3tTzq8EJAYeAiK4XQQiUAAERvQSTrCEKARFd74AQKAECInoJJllDFAIiut4BIVACBET0EkyyhigERHS9A0KgBAiI6CWYZA1RCIjoegeEQAkQENFLMMkaohAQ0fUOCIESICCil2CSNUQhIKLrHRACJUBARC/BJGuIQkBE1zsgBEqAgIhegknWEIWAiK53QAiUAAERvQSTrCEKARFd74AQKAECInoJJrnRhvjaa6/Zm2++aa+88oq9++671rdvX+vXr1+jDaOunldE903HmDFjbI899phlgnbYYQcbNGiQbbXVVjbHHHPU1QQ24sNMmzbNnn/+eXv22Wfd34kTJ0YO48MPP7Rll1028jpdEI6AiG5mkyZNsp133rmqd2SdddaxQw45xHbbbTebZ555qmrbzBe//vrr9vPPPxt/x40bZ1988YWxQvtl3nnntV9//TU2DKussoo999xzwjk2YrNeWHqi33vvvbbddtvVAOF/m84+++z28ssvGy9lM8v3339vrMj8ffrpp+3999+3t956y9555x2bOnVqrKGjFf3999+h13bq1Ml9dAcOHGiLLrqodevWzWabbbZY99VFlREoPdHbtGmT+vvB6sOKH0c++ugjW3LJJetuS/Dqq6+6D9eDDz7oVlP2zGHSrl07++WXX0J/W3HFFW2ppZZy4+vSpYv7oKL9dOjQwX788Ufr0aNHHIh0TQoIiOghRB8xYoRtueWW9scffzi188orr7Svv/7aPvnkk6pUzo8//tiWXnrpitN04YUX2uDBg22FFVawN954w9q2bZvClMa/BSr2Bx984PbJt99+u911112xGnft2tURF4ywW0DkRRZZJFZbXVQMAiJ6gOhRJ1T9+++/bpW75JJL3N4+SjbZZBM7/PDDneU4qIIuuOCCbmVDsjQ20cenn35qjzzyiHt2yI1FO0rYhmy44Ya200472UYbbeRWYkljIiCiB4j+22+/2dxzzx17Nv/55x877rjjbPjw4ZFt1lpr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';

    doc.moveDown()
        .fontSize(10)
        .text(engineerInfo.lastName, 100, buff_y)
        .fontSize(10)
        .text(customerInfo.lastName, 450, buff_y)
        //    .image(engineerInfo.signature, 50, buff_y, {width: 100, height: 50})

        // temporaire, pour le dev
        .image(engineerInfo.signature, 50, buff_y + 10, { scale: 0.6 })

        .moveTo(50, buff_y + 60)
        .lineTo(200, buff_y + 60)
        .stroke()
        //    .image(customerInfo.signature, 50, buff_y, {width: 100, height: 50})

        // temporaire, pour le dev
        .image(customerInfo.signature, 400, buff_y + 10, { scale: 0.6 })

        .moveTo(400, buff_y + 60)
        .lineTo(550, buff_y + 60)
        .stroke()

        .fontSize(12)
        .text(engineerInfo.lastName + ' ' + engineerInfo.firstName, 50, buff_y + 70)
        .fontSize(9)
        .text(engineerInfo.position, 50, buff_y + 85)
        .fontSize(9)

        .fontSize(12)
        .text(customerInfo.lastName + ' ' + customerInfo.firstName, 280, buff_y + 70, {
            width: 270,
            align: 'right'
        })
        .fontSize(9)
        .text(customerInfo.position + ' of ' + customerInfo.company, 280, buff_y + 85, {
            width: 270,
            align: 'right'
        })

        .end();
}

module.exports = { pdfGenPending, pdfGenAccepted };
