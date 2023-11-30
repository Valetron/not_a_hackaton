package com.backend.bot;

import com.backend.convert.ConvertEntityToDto;
import com.backend.model.activeTest.ActiveTestRepository;
import com.backend.model.answer.dto.AnswerOutputDTO;
import com.backend.model.question.dto.QuestionOutputDTO;
import com.backend.model.question.dto.QuestionOutputDtoForBot;
import com.backend.model.questionInTest.QuestionInTestService;
import com.backend.model.resultAnswer.ResultAnswerService;
import com.backend.model.resultAnswer.dto.ResultAnswerDTO;
import com.backend.model.resultQuestion.ResultQuestion;
import com.backend.model.resultQuestion.ResultQuestionService;
import com.backend.model.resultQuestion.dto.ResultQuestionDTO;
import com.backend.model.resultTest.ResultTestService;
import com.backend.model.resultTest.dto.ResultTestOutputDTO;
import com.backend.model.student.StudentService;
import com.backend.model.student.dto.StudentInputDTO;
import com.backend.model.test.Test;
import com.backend.model.test.TestServise;
import com.backend.model.test.dto.TestOutputDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.commands.SetMyCommands;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.DeleteMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.EditMessageText;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.commands.BotCommand;
import org.telegram.telegrambots.meta.api.objects.commands.scope.BotCommandScopeDefault;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.*;

@Component
public class TestingBot extends TelegramLongPollingBot {

    private Long testId;
    private List<QuestionOutputDtoForBot> questions;
    private int numberQuestion;
    private int testMessageId;
    private String testName;
    private List<Long> resultQuestionIds = new LinkedList<>();
    private BotStatus botStatus = BotStatus.AWAITING_COMMAND;
    @Value("${bot.name}")
    private String name;
    @Autowired
    private StudentService studentService;
    @Autowired
    private ActiveTestRepository activeTestRepository;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;
    @Autowired
    private ResultTestService resultTestService;
    @Autowired
    private TestServise testServise;
    @Autowired
    private QuestionInTestService qitService;
    @Autowired
    private ResultQuestionService resultQuestionService;
    @Autowired
    private ResultAnswerService resultAnswerService;

    public TestingBot(@Value("${bot.token}") String botToken) {
        super(botToken);
        try {
            execute(new SetMyCommands(setMyBotCommand(), new BotCommandScopeDefault(), null));
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            receivedCommand(update);
        } else if (update.hasCallbackQuery()){
            receivedCallBackQuery(update);
        }
    }

    @Override
    public String getBotUsername() {
        return name;
    }

    private void receivedCommand(Update update){
        Message message = update.getMessage();
        Long chatId = message.getChatId();
        String text = message.getText();

        if (text.equals("/start")) {
            startCommand(chatId);
            botStatus = BotStatus.AWAITING_COMMAND;
            return;
        }
        switch (botStatus) {
            case AWAITING_COMMAND:
                choseCommand(message);
                break;
            case AWAITING_REGISTRATION:
                registerUser(message);
                break;
            case SOLVES_TEST:
                solveTest(message, questions.get(numberQuestion));
                if (numberQuestion + 1 >= questions.size()){
                    botStatus = BotStatus.AWAITING_COMMAND;
                    deleteMessege(chatId, testMessageId);
                    tryToSendMessage(chatId, "Тест завершен");

                    List<ResultQuestionDTO> resultQuestions = resultQuestionService.getAllQuestions(
                            resultTestService.saveResultTest(resultQuestionIds, chatId, testName));
                    StringBuilder textAns = new StringBuilder();
                    for (ResultQuestionDTO questionDTO : resultQuestions){
                        List<ResultAnswerDTO> answers = resultAnswerService.getAnswers(questionDTO.getId());


                        textAns.append("1" +") " + questionDTO.getName() + "\n");
                        int i = 0;
                        for (ResultAnswerDTO resultAnswerDTO : answers){
                            i++;
                            textAns.append("  " +i + ") " + resultAnswerDTO.getName());
                            if (resultAnswerDTO.getIsCorrect()){
                                textAns.append("   | правильный");

                            }
                            if (resultAnswerDTO.getIsSelected()){
                                textAns.append(" | выбран");
                            }

                        }
                        textAns.append("\n\n");

                    }
                    tryToSendMessage(chatId, textAns.toString());
                }
                if (numberQuestion + 1 < questions.size()){
                    numberQuestion += 1;
                    generateEditQuestion(chatId, questions.get(numberQuestion), testMessageId);
                }
                break;
        }
    }

    private void receivedCallBackQuery(Update update){
        Message message = update.getCallbackQuery().getMessage();
        String[] callBackData = update.getCallbackQuery().getData().split(" ");
        String action = callBackData[0];
        switch (action){
            case "test":
                testId = Long.valueOf(callBackData[1]);
                setTest(testId, message);
                break;
            case "solve-test":
                testId = Long.valueOf(callBackData[1]);
                questions = qitService.getAllQuestionInTest(testId);
                testName = testServise.getTest(testId).getName();
                numberQuestion = 0;
                testMessageId = message.getMessageId();
                QuestionOutputDtoForBot question = questions.getFirst();
                generateEditQuestion(message.getChatId(), question, testMessageId);
                botStatus = BotStatus.SOLVES_TEST;
                break;

        }
    }
    private List<BotCommand> setMyBotCommand() {
        List<BotCommand> botCommands = new ArrayList<>();
        botCommands.add(new BotCommand("/start", "Стартовое сообщение"));
        botCommands.add(new BotCommand("/my_tests", "Мои тесты"));
        botCommands.add(new BotCommand("/registration", "Регистрации"));
        botCommands.add(new BotCommand("/help", "Помощь"));

        return botCommands;
    }

    private void tryToSendMessage(Long chatId, String text) {
        try {
            execute(new SendMessage(String.valueOf(chatId), text));
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    private void tryToSendMessage(SendMessage sendMessage) {
        try {
            execute(sendMessage);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    private void tryToSendMessage(EditMessageText editMessage) {
        try {
            execute(editMessage);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    private void choseCommand(Message message) {
        Long chatId = message.getChatId();
        String text = message.getText();
//        if (!studentService.existsStudent(chatId)){
//            tryToSendMessage(chatId, "Сначало нужно зарегестрироваться в /registration");
//        } else {
            switch (text) {
                case "/registration":
                    registrationCommand(chatId);
                    break;
                case "/my_tests":
                    getAllTests(message);
                    break;
                case "/help":
                    tryToSendMessage(chatId, "Если бот сломался нажмите /start");
                    break;
                default:
                    unknownCommand(chatId);
            }
//        }
    }

    private void startCommand(Long chatId) {
        tryToSendMessage(chatId, "Приветствую, я бот Gleb для прохождения тестов.\n" +
                "Если вы не ещё не зарегистрированны нажмите /registration\n" +
                "Что бы посмотреть свои тесты нажмите /my_tests");
    }

    private void registrationCommand(Long chatId) {
        if (studentService.existsStudent(chatId)) {
            tryToSendMessage(chatId, "Вы уже зарегистрированны\n" +
                    "что бы прервать процесс регистрации нажмите /abort");
        } else {
            tryToSendMessage(chatId, "введите свои данные в формате:\n\n" +
                    "Имя\n" +
                    "Фамилия\n" +
                    "Отчество\n" +
                    "Университет\n" +
                    "Группа\n");
            botStatus = BotStatus.AWAITING_REGISTRATION;
        }
    }

    private void unknownCommand(Long chatId) {
        tryToSendMessage(chatId, "Извините мне не известна эта команда\n" +
                "Что бы посмотреть команды с которыми я работаю нажмите /help");
    }

    private void getAllTests(Message messageInput){
        Long chatId = messageInput.getChatId();

        InlineKeyboardMarkup markupInline = new InlineKeyboardMarkup();
        List<List<InlineKeyboardButton>> rowsInline = new ArrayList<>();
        List<InlineKeyboardButton> rowInline = new ArrayList<>();

        List<Test> testList = activeTestRepository.findAllTestsByStudentChatId(chatId);
        List<TestOutputDTO> testOutputDTOs = testList.stream().map(convertEntityToDto::testToDto).toList();

        List<TestOutputDTO> testDtos = new LinkedList<>(testOutputDTOs);

        int countButtons = 1;
        int countTest = 1;
        String tests = "";
        while (!testDtos.isEmpty()){
            TestOutputDTO testDto = testDtos.getFirst();
            tests += String.format("%d. %s\n", countTest, testDto.getName());

            if (countButtons > 4){
                rowsInline.add(rowInline);
                rowInline = new ArrayList<>();
                countButtons = 0;
            }
            InlineKeyboardButton button = new InlineKeyboardButton();
            button.setText(String.valueOf(countTest));
            button.setCallbackData("test " + testDto.getId());
            rowInline.add(button);

            countButtons += 1;
            countTest += 1;
            testDtos.removeFirst();
        }
        rowsInline.add(rowInline);
        markupInline.setKeyboard(rowsInline);
        SendMessage sendMessage = new SendMessage();
        sendMessage.setChatId(chatId);
        sendMessage.setText(tests);
        sendMessage.setReplyMarkup(markupInline);
        if (tests.isEmpty()){
            tryToSendMessage(chatId, "У вас нету тестов");
        } else {
            tryToSendMessage(sendMessage);
        }
    }

    private void setTest(Long testId, Message message){
        Long chatId = message.getChatId();
        int messageId = message.getMessageId();
        TestOutputDTO test = testServise.getTest(testId);
        String text = String.format("Тест: %s\n\nОписание: %s\n\nДлительность: %d минут\n\n",
                test.getName(), test.getDescription(), test.getDuration());

        InlineKeyboardMarkup keyboardMarkup = new InlineKeyboardMarkup();
        List<List<InlineKeyboardButton>> rowsInline = new ArrayList<>();
        List<InlineKeyboardButton> rowInline = new ArrayList<>();
        InlineKeyboardButton button = new InlineKeyboardButton();
        button.setText("Начать тест");
        button.setCallbackData("solve-test "+testId);
        rowInline.add(button);
        rowsInline.add(rowInline);
        keyboardMarkup.setKeyboard(rowsInline);

        EditMessageText editMessage = new EditMessageText();
        editMessage.setChatId(chatId);
        editMessage.setMessageId(messageId);
        editMessage.setText(text);
        editMessage.setReplyMarkup(keyboardMarkup);

        try {
            execute(editMessage);
            botStatus = BotStatus.SOLVES_TEST;
        }catch (TelegramApiException e){
            e.printStackTrace();
        }
    }

    public void sendResult(Long chatId, ResultTestOutputDTO resultTest){
//        String text = String.format("Тест: %s\n\nОписание: %s\n\nДлительность: %d минут\n\n",
//                resultTest.get);
//
//        InlineKeyboardMarkup keyboardMarkup = new InlineKeyboardMarkup();
//        List<List<InlineKeyboardButton>> rowsInline = new ArrayList<>();
//        List<InlineKeyboardButton> rowInline = new ArrayList<>();
//        InlineKeyboardButton button = new InlineKeyboardButton();
//        button.setText("Начать тест");
//        button.setCallbackData("solve-test "+testId);
//        rowInline.add(button);
//        rowsInline.add(rowInline);
//        keyboardMarkup.setKeyboard(rowsInline);
//
//        SendMessage sendMessage = new SendMessage();
//        sendMessage.setChatId(chatId);
//        sendMessage.setText(text);
//        sendMessage.setReplyMarkup(keyboardMarkup);

        tryToSendMessage(chatId,"completed");
    }
    public void sendTest(Long chatId, Long testId){
        TestOutputDTO test = testServise.getTest(testId);
        String text = String.format("Тест: %s\n\nОписание: %s\n\nДлительность: %d минут\n\n",
                test.getName(), test.getDescription(), test.getDuration());

        InlineKeyboardMarkup keyboardMarkup = new InlineKeyboardMarkup();
        List<List<InlineKeyboardButton>> rowsInline = new ArrayList<>();
        List<InlineKeyboardButton> rowInline = new ArrayList<>();
        InlineKeyboardButton button = new InlineKeyboardButton();
        button.setText("Начать тест");
        button.setCallbackData("solve-test "+testId);
        rowInline.add(button);
        rowsInline.add(rowInline);
        keyboardMarkup.setKeyboard(rowsInline);

        SendMessage sendMessage = new SendMessage();
        sendMessage.setChatId(chatId);
        sendMessage.setText(text);
        sendMessage.setReplyMarkup(keyboardMarkup);

        tryToSendMessage(sendMessage);
    }

    private void generateEditQuestion(Long chatId, QuestionOutputDtoForBot question, int messageId){
        String questionText = question.getQuestionText();
        StringBuilder text = new StringBuilder(questionText);
        text.append("\n\n");

        List<AnswerOutputDTO> answers = question.getAnswers();
        for(int i = 0; i <answers.size(); i++){
            text.append(i+1).append(". ").append(answers.get(i).getName()).append("\n");
        }
        EditMessageText editMessage = new EditMessageText();
        editMessage.setChatId(chatId);
        editMessage.setText(text.toString());
        editMessage.setMessageId(messageId);
        tryToSendMessage(editMessage);
    }
    private void solveTest(Message messageInput, QuestionOutputDtoForBot question){
        Long chatId = messageInput.getChatId();
        Integer userMessageId = messageInput.getMessageId();
        List<Integer> numberAnswers = Arrays.stream(messageInput.getText()
                .split(",\\s")).map(Integer::valueOf).toList();
        resultQuestionIds.add(resultQuestionService.saveAnswer(question,  numberAnswers));

        deleteMessege(chatId, userMessageId);
    }



    //TODO: не забыть сделать из этого обобщеный создатель сообщения с кнопками
//    private void createQuestion(Long chatId, QuestionInTestOutputDTO question){
//        List<AnswerOutputDTO> answers = question.getAnswers();
//        String text = question.getQuestionText();
//
//        InlineKeyboardMarkup markupInline = new InlineKeyboardMarkup();
//        List<List<InlineKeyboardButton>> rowsInline = new ArrayList<>();
//        List<InlineKeyboardButton> rowInline = new ArrayList<>();
//
//        int countButtons = 1;
//        int countTest = 1;
//        String tests = "";
//        while (!answers.isEmpty()){
//            AnswerOutputDTO answer = answers.getFirst();
//            if (countButtons > 4){
//                rowsInline.add(rowInline);
//                rowInline = new ArrayList<>();
//                countButtons = 0;
//            }
//            InlineKeyboardButton button = new InlineKeyboardButton();
//            button.setText(String.valueOf(countTest));
//            button.setCallbackData("test " + testDto.getId());
//            rowInline.add(button);
//
//            countButtons += 1;
//            countTest += 1;
//            testDtos.removeFirst();
//        }
//        rowsInline.add(rowInline);
//        markupInline.setKeyboard(rowsInline);
//        SendMessage sendMessage = new SendMessage();
//        sendMessage.setChatId(chatId);
//        sendMessage.setText(tests);
//        sendMessage.setReplyMarkup(markupInline);
//        tryToSendMessage(sendMessage);
//    }

    private void registerUser(Message message) {
        String text = message.getText();
        if (text.equals("/abort")) {
            abortRegistration(message.getChatId());
        } else {
            saveAccount(message);
        }
    }

    private void abortRegistration(Long chatId) {
        botStatus = BotStatus.AWAITING_COMMAND;
        tryToSendMessage(chatId, "Регистрация прервана");
    }

    private void saveAccount(Message message) {
        Long chatId = message.getChatId();
        String username = message.getChat().getUserName();
        String text = message.getText();

        try {
            String[] result = text.split("\\n+");
            StudentInputDTO studentInput = new StudentInputDTO(
                    //chatId, username, name, patronymic, surname, university, title_group
                    chatId, username, result[0], result[2], result[1], result[3], result[4]);
            studentService.createStudent(studentInput);
            tryToSendMessage(chatId, "Вы успешно зарегистрировались");
            botStatus = BotStatus.AWAITING_COMMAND;
        } catch (ArrayIndexOutOfBoundsException e) {
            tryToSendMessage(chatId, "Ошибка при регистрации\n" +
                    "Данные в неправильном формате\n" +
                    "Прервать регистрацию /abort");
        }catch (NoSuchElementException e){
            tryToSendMessage(chatId, e.getMessage());
        }
    }

    private void deleteMessege(Long chatId, int messageId){
        DeleteMessage deleteMessage = new DeleteMessage(chatId.toString(), messageId);
        try{
            execute(deleteMessage);
        }catch (TelegramApiException e){
            e.printStackTrace();
        }
    }
}
