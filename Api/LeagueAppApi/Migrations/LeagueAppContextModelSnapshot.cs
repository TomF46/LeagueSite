﻿// <auto-generated />
using System;
using LeagueAppApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace LeagueAppApi.Migrations
{
    [DbContext(typeof(LeagueAppContext))]
    partial class LeagueAppContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Club", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Clubs");
                });

            modelBuilder.Entity("Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ClubId")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Position")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("SquadId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ClubId");

                    b.HasIndex("SquadId");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("Squad", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ClubId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ClubId");

                    b.ToTable("Squads");
                });

            modelBuilder.Entity("Transfer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("FromSquadId")
                        .HasColumnType("int");

                    b.Property<int?>("PlayerId")
                        .HasColumnType("int");

                    b.Property<int?>("ToSquadId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FromSquadId");

                    b.HasIndex("PlayerId");

                    b.HasIndex("ToSquadId");

                    b.ToTable("Transfers");
                });

            modelBuilder.Entity("Player", b =>
                {
                    b.HasOne("Club", "Club")
                        .WithMany()
                        .HasForeignKey("ClubId");

                    b.HasOne("Squad", "Squad")
                        .WithMany("Players")
                        .HasForeignKey("SquadId");
                });

            modelBuilder.Entity("Squad", b =>
                {
                    b.HasOne("Club", "Club")
                        .WithMany("Squads")
                        .HasForeignKey("ClubId");
                });

            modelBuilder.Entity("Transfer", b =>
                {
                    b.HasOne("Squad", "FromSquad")
                        .WithMany()
                        .HasForeignKey("FromSquadId");

                    b.HasOne("Player", "Player")
                        .WithMany()
                        .HasForeignKey("PlayerId");

                    b.HasOne("Squad", "ToSquad")
                        .WithMany()
                        .HasForeignKey("ToSquadId");
                });
#pragma warning restore 612, 618
        }
    }
}
