package com.backend.bot;

import com.backend.domain.Student;
import com.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.commands.SetMyCommands;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.commands.BotCommand;
import org.telegram.telegrambots.meta.api.objects.commands.scope.BotCommandScopeDefault;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.ArrayList;
import java.util.List;

@Component
public class TestingBot extends TelegramLongPollingBot {

    private BotStatus botStatus = BotStatus.AWAITING_COMMAND;
    @Value("${bot.name}")
    private String name;
    @Autowired
    private StudentRepository studentRepository;

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
        Message message = update.getMessage();
        Long chatId = message.getChatId();
        String text = message.getText();

        if (text.equals("/start")) {
            startCommand(chatId);
            return;
        }
        switch (botStatus) {
            case AWAITING_COMMAND:
                choseCommand(message);
                break;
            case AWAITING_REGISTRATION:
                registerUser(message);
                break;
        }
    }

    @Override
    public String getBotUsername() {
        return name;
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

    private void choseCommand(Message message) {
        Long chatId = message.getChatId();
        String text = message.getText();
        switch (text) {
            case "/registration":
                registrationCommand(chatId);
                break;
            case "/my_tests":
                tryToSendMessage(chatId, "Пока что тут ничего нет");
                break;
            case "/help":
                tryToSendMessage(chatId, "Бэкендеру лЭнь придумывать хелпу," +
                        " всё есть в /start");
                break;
            default:
                unknownCommand(chatId);
        }
    }

    private void startCommand(Long chatId) {
        tryToSendMessage(chatId, "Приветствую, я бот Gleb для прохождения тестов.\n" +
                "Если вы не ещё не зарегистрированны нажмите /registration\n" +
                "Что бы посмотреть свои тесты нажмите /my_test");
    }

    private void registrationCommand(Long chatId) {
        if (studentRepository.existsById(chatId)) {
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

    private void registerUser(Message message) {
        String text = message.getText();
        switch (text) {
            case "/abort":
                abortRegistration(message.getChatId());
                break;
            default:
                saveAccount(message);
                break;
        }
    }

    private void abortRegistration(Long chatId) {
        botStatus = BotStatus.AWAITING_COMMAND;
        tryToSendMessage(chatId, "Регистрация прервана");
    }

    private void saveAccount(Message message) {
        Long chatId = message.getChatId();
        Long userId = message.getFrom().getId();
        String username = message.getChat().getUserName();
        String text = message.getText();

        try {
            String[] result = text.split("\\n+");
            //                          chatId, username, firstname, midlename, surname, university, title_group
            Student student = new Student(userId, username, result[0], result[1], result[2], result[3], result[4]);
            studentRepository.save(student);
            tryToSendMessage(chatId, "Вы успешно зарегистрировались");
            botStatus = BotStatus.AWAITING_COMMAND;
        } catch (ArrayIndexOutOfBoundsException e) {
            tryToSendMessage(chatId, "Ошибка при регистрации\n" +
                    "Скорее всего данные введены в неправельном формате");
        }
    }
}
