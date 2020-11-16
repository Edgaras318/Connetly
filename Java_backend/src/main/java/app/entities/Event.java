package app.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.sql.Time;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "Event")
@Getter
@Setter
public class Event {

    @Id
    @Type(type="uuid-char")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotNull
    private String name;

    @ManyToMany(mappedBy = "events", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Account> members = new HashSet<>();

    @OneToOne
    @JsonIgnore
    @JoinColumn(name= "account_id")
    private Account owner;

    @OneToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @OneToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private String description;

    private Date date;

    private Time time;

    public Event() {
    }

    public Event(@NotNull String name, Account owner, Location location) {
        this.name = name;
        this.owner = owner;
        this.location = location;
    }

    public Event(@NotNull String name, Set<Account> accountSet) {
        this.name = name;
        this.members = accountSet;
    }


    public void removeMember(Account account) {
        for(Account a : this.members){
            if(a.getId().equals(account.getId())){
                this.members.remove(a);
            }
        }
    }

    public void joinMember(Account account){
        this.members.add(account);
    }
}
