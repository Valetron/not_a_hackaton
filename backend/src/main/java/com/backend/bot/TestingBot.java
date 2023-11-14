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

    private enum StatusBot {
        AWAITING_REGISTRATION,
        AWAITING_COMMAND
    }

    private StatusBot statusBot = StatusBot.AWAITING_COMMAND;

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

        Long chatId = update.getMessage().getChatId();
        String text = update.getMessage().getText();

        switch (statusBot) {
            case AWAITING_COMMAND:
                switch (text) {
                    case "/start":
                        startCommand(chatId);
                        break;
                    case "/registration":
                        registrationCommand(chatId);
                        break;
                    case "/my_tests":
                        try {
                            execute(new SendMessage(String.valueOf(chatId), "Пока что тут ничего нет"));
                        } catch (TelegramApiException e) {
                            e.printStackTrace();
                        }
                        break;
                    case "/help":
                        try {
                            execute(new SendMessage(String.valueOf(chatId), "Бэкендеру лЭнь придумывать хелпу," +
                                    " всё есть в /start"));
                        }
                        catch (TelegramApiException e) {
                            e.printStackTrace();
                        }
                        break;
                    default:
                        unknownCommand(chatId);
                        break;
                }
                break;
            case AWAITING_REGISTRATION:
                try {
                    registrationStudent(update.getMessage());
                } catch (TelegramApiException e) {
                    throw new RuntimeException(e);
                }
                break;
        }
    }

    @Override
    public String getBotUsername() {
        return name;
    }

    private void registrationCommand(Long chatId) {

        if (studentRepository.existsById(chatId)) {
            try {
                execute(new SendMessage(String.valueOf(chatId), "Вы уже зарегистрированны"));
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        } else {
            try {
                execute(new SendMessage(String.valueOf(chatId), "введите свои данные в формате:\n\n" +
                        "Имя\n" +
                        "Фамилия\n" +
                        "Отчество\n" +
                        "Университет\n" +
                        "Группа\n"));
                statusBot = StatusBot.AWAITING_REGISTRATION;
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        }
    }

    private void registrationStudent(Message message) throws TelegramApiException {

        Long chatId = message.getChatId();
        Long userId = message.getFrom().getId();
        String userName = message.getChat().getUserName();
        String text = message.getText();

        try {
            String[] result = text.split("\\n+");
            //                          chatId, username, firstname, midlename, surname, university, title_group
            Student student = new Student(userId, userName, result[0], result[1], result[2], result[3], result[4]);
            studentRepository.save(student);
            execute(new SendMessage(String.valueOf(chatId), "Вы успешно зарегистрировались"));
        } catch (ArrayIndexOutOfBoundsException e) {
            execute(new SendMessage(String.valueOf(chatId), "Вы ввели данные в неправельном формате"));
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

    private void startCommand(Long chatId) {
        try {
            execute(new SendMessage(String.valueOf(chatId), "Приветствую, я бот Gleb для прохождения тестов.\n" +
                    "Если вы не ещё не зарегистрированны нажмите /registration\n" +
                    "Что бы посмотреть свои тесты нажмите /my_test"));
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    private void unknownCommand(Long chatId) {
        try {
            execute(new SendMessage(String.valueOf(chatId), "Извините мне не известна эта команда\n" +
                    "Что бы посмотреть команды с которыми я работаю нажмите /help"));
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }
}
