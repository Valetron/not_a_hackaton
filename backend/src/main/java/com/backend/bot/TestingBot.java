package com.backend.bot;

import com.backend.domain.Student;
import com.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

import java.util.List;

@Component
public class TestingBot extends TelegramLongPollingBot {



    @Value("@{bot.name}")
    private String name;
    @Autowired
    StudentService studentService;

    public TestingBot(@Value("${bot.token}") String botToken) {
        super(botToken);
    }

    @Override
    public String getBotUsername() {
        return name;
    }
    @Override
    public void onUpdateReceived(Update update) {

        var chatId = update.getMessage().getChatId();
        try {
            studentService.addStudent(parseStudent(update));
            execute(new SendMessage(String.valueOf(chatId), "Регстрация успешна"));

        } catch (TelegramApiException e) {
            throw new RuntimeException(e);
        }

    }



    private Student parseStudent(Update update){
        Long chatId = update.getMessage().getChatId();
        String userName = update.getMessage().getChat().getUserName();
        String text = update.getMessage().getText();
        String[] result = text.split("[\\s\\n]+");
        //              chatId, username, firstname, midlename, surname, university, title_group
        return new Student(chatId,userName,result[0], result[1], result[2], result[3], result[4]);
    }

}
